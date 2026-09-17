import { getDb } from './mongodb.js';
import { ObjectId } from 'mongodb';
import { parsePageContent, updatePageFiles, sanitizeFieldText } from './cms-parser.js';
import path from 'path';
import fs from 'fs';

function calculateSeoScore(seo) {
  if (!seo) return 0;
  let score = 0;
  const checks = [
    { field: 'metaTitle', weight: 15 },
    { field: 'metaDescription', weight: 15 },
    { field: 'metaKeywords', weight: 5, isArray: true },
    { field: 'canonicalUrl', weight: 10 },
    { field: 'openGraph.title', weight: 10 },
    { field: 'openGraph.description', weight: 10 },
    { field: 'openGraph.image', weight: 5 },
    { field: 'twitterCard.title', weight: 5 },
    { field: 'twitterCard.description', weight: 5 },
    { field: 'schema.type', weight: 10 },
    { field: 'robots', weight: 5 },
    { field: 'sitemap.include', weight: 5 },
  ];

  for (const check of checks) {
    const parts = check.field.split('.');
    let value = seo;
    for (const part of parts) {
      value = value?.[part];
    }

    if (check.isArray) {
      if (Array.isArray(value) && value.length > 0) score += check.weight;
    } else if (value !== undefined && value !== null && value !== '') {
      score += check.weight;
    }
  }

  return Math.min(100, score);
}

export async function getDashboardCounts() {
  try {
    const db = await getDb();
    const [contactCount, mediaCount, routesList, applicationsCount] = await Promise.all([
      db.collection('contact_submissions').countDocuments({}).then(c => c || db.collection('submissions').countDocuments({})),
      db.collection('cms_media').countDocuments({}).then(c => c || db.collection('media').countDocuments({})),
      getRoutesList().catch(() => []),
      db.collection('applications').countDocuments({}).catch(() => 0),
    ]);

    const staticCount = routesList.filter(r => r.type === 'static' || r.type === 'alias').length;
    const templatesCount = routesList.filter(r => r.type === 'dynamic_template' || r.type === 'dynamic').length;

    return {
      contactCount,
      applicationsCount: applicationsCount || 0,
      pagesCount: routesList.length, // Accurate admin pages & routes count
      totalRoutesCount: routesList.length,
      staticCount,
      templatesCount,
      mediaCount,
      websitesCount: 1,
    };
  } catch (err) {
    console.error('Error fetching dashboard counts:', err);
    return {
      contactCount: 0,
      applicationsCount: 0,
      pagesCount: 0,
      totalRoutesCount: 0,
      mediaCount: 0,
      websitesCount: 1,
    };
  }
}

export async function scanRoutes() {
  const db = await getDb();
  const appDir = path.join(process.cwd(), 'app');
  if (!fs.existsSync(appDir)) return [];

  const foundRoutes = [];

  function scanDir(dirPath, routePrefix = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      if (
        item.name.startsWith('_') ||
        item.name.startsWith('.') ||
        item.name === 'api' ||
        item.name === 'admin' ||
        item.name.toLowerCase() === 'home' ||
        (item.name === '[slug]' && routePrefix === '') ||
        (item.name === '[slug]' && routePrefix === '/blog') ||
        (item.name === '[slug]' && routePrefix === '/technologies') ||
        (item.name === 'reactjs' && routePrefix === '/technologies')
      ) {
        continue;
      }

      const fullPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        const subPrefix = routePrefix === '' ? `/${item.name}` : `${routePrefix}/${item.name}`;
        scanDir(fullPath, subPrefix);
      } else if (item.isFile() && (item.name === 'page.js' || item.name === 'page.jsx' || item.name === 'page.tsx')) {
        const pathUrl = routePrefix === '' ? '/' : routePrefix;
        const relativeFilePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        const isDynamic = pathUrl.includes('[') && pathUrl.includes(']');
        const isAlias = pathUrl === '/technologies/reactjs';

        let routeType = 'static';
        if (isDynamic) {
          routeType = 'dynamic_template';
        } else if (isAlias) {
          routeType = 'alias';
        }

        foundRoutes.push({
          path: pathUrl,
          type: routeType,
          aliasTarget: isAlias ? '/technologies/react' : null,
          status: 'active',
          filePath: relativeFilePath,
          lastScanned: new Date(),
        });
      }
    }
  }

  scanDir(appDir);

  // Deduplicate foundRoutes in-memory by path
  const uniqueFoundRoutesMap = new Map();
  for (const r of foundRoutes) {
    if (!uniqueFoundRoutesMap.has(r.path)) {
      uniqueFoundRoutesMap.set(r.path, r);
    }
  }
  const validRoutes = Array.from(uniqueFoundRoutesMap.values());

  // Deduplicate existing cms_routes in database safely
  const existingDbRoutes = await db.collection('cms_routes').find({}).toArray();
  const existingSeoList = await db.collection('cms_seo').find({}).toArray();
  const seoRouteIds = new Set(existingSeoList.map(s => s.routeId?.toString()).filter(Boolean));
  const existingContentDocs = await db.collection('cms_page_content').find({}).toArray();
  const contentRouteIds = new Set(existingContentDocs.map(c => c.routeId?.toString()).filter(Boolean));

  // 1. Deduplicate cms_routes
  const routesByPath = new Map();
  for (const r of existingDbRoutes) {
    if (!routesByPath.has(r.path)) {
      routesByPath.set(r.path, []);
    }
    routesByPath.get(r.path).push(r);
  }

  const duplicateIdsToDelete = [];
  const existingRouteMap = new Map();

  for (const [rPath, docs] of routesByPath.entries()) {
    if (docs.length === 1) {
      existingRouteMap.set(rPath, docs[0]);
      continue;
    }

    // Retain the primary document linked to SEO or content, or earliest created
    let primaryDoc = docs.find(d => seoRouteIds.has(d._id.toString()) || contentRouteIds.has(d._id.toString()));
    if (!primaryDoc) {
      primaryDoc = docs[0];
    }
    existingRouteMap.set(rPath, primaryDoc);

    for (const d of docs) {
      if (d._id.toString() !== primaryDoc._id.toString()) {
        duplicateIdsToDelete.push(d._id);
      }
    }
  }

  if (duplicateIdsToDelete.length > 0) {
    console.log(`[scanRoutes] Pruning ${duplicateIdsToDelete.length} redundant duplicate records from cms_routes...`);
    await db.collection('cms_routes').deleteMany({ _id: { $in: duplicateIdsToDelete } });
  }

  // 2. Deduplicate cms_page_content
  const contentByPath = new Map();
  for (const c of existingContentDocs) {
    if (!c.path) continue;
    if (!contentByPath.has(c.path)) {
      contentByPath.set(c.path, []);
    }
    contentByPath.get(c.path).push(c);
  }

  const contentDupesToDelete = [];
  const primaryContentMap = new Map();

  for (const [cPath, docs] of contentByPath.entries()) {
    if (docs.length === 1) {
      primaryContentMap.set(cPath, docs[0]);
      continue;
    }

    // Sort documents so primary is the one with highest version, most sections, or latest updatedAt
    docs.sort((a, b) => {
      const vA = a.version || 0;
      const vB = b.version || 0;
      if (vB !== vA) return vB - vA;

      const secA = Array.isArray(a.sections) ? a.sections.length : 0;
      const secB = Array.isArray(b.sections) ? b.sections.length : 0;
      if (secB !== secA) return secB - secA;

      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });

    const primaryDoc = docs[0];
    primaryContentMap.set(cPath, primaryDoc);

    for (let i = 1; i < docs.length; i++) {
      contentDupesToDelete.push(docs[i]._id);
    }
  }

  if (contentDupesToDelete.length > 0) {
    console.log(`[scanRoutes] Pruning ${contentDupesToDelete.length} redundant duplicate records from cms_page_content...`);
    await db.collection('cms_page_content').deleteMany({ _id: { $in: contentDupesToDelete } });
  }

  // 3. Deduplicate cms_seo
  const seoByPath = new Map();
  for (const s of existingSeoList) {
    if (!s.path) continue;
    if (!seoByPath.has(s.path)) {
      seoByPath.set(s.path, []);
    }
    seoByPath.get(s.path).push(s);
  }

  const seoDupesToDelete = [];
  for (const [sPath, docs] of seoByPath.entries()) {
    if (docs.length > 1) {
      docs.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
      for (let i = 1; i < docs.length; i++) {
        seoDupesToDelete.push(docs[i]._id);
      }
    }
  }

  if (seoDupesToDelete.length > 0) {
    console.log(`[scanRoutes] Pruning ${seoDupesToDelete.length} redundant duplicate records from cms_seo...`);
    await db.collection('cms_seo').deleteMany({ _id: { $in: seoDupesToDelete } });
  }

  // Purge legacy src/app/ duplicate records, duplicate /Home route records, root [slug] catch-all records, hidden blog route records, hidden technology template/alias records, and stale non-existent files
  await db.collection('cms_routes').deleteMany({
    $or: [
      { filePath: { $regex: '^src/app/' } },
      { path: '/Home' },
      { path: '/[slug]' },
      { path: '/blog/[slug]' },
      { path: '/technologies/[slug]' },
      { path: '/technologies/reactjs' },
      { type: 'blog' },
      { path: { $regex: '^/blog/.+' } },
      { filePath: { $regex: 'app/\\[slug\\]' } }
    ]
  });

  const remainingDbRoutes = await db.collection('cms_routes').find({}).toArray();
  for (const dbRoute of remainingDbRoutes) {
    if (dbRoute.filePath && dbRoute.type !== 'blog') {
      const fullPath = path.join(process.cwd(), dbRoute.filePath);
      if (!fs.existsSync(fullPath) || dbRoute.path === '/[slug]') {
        await db.collection('cms_routes').deleteOne({ _id: dbRoute._id });
      }
    }
  }

  // Ensure unique indexes on path exist across all CMS collections to permanently prevent duplicates
  try {
    await db.collection('cms_routes').createIndex({ path: 1 }, { unique: true });
  } catch (idxErr) {
    console.warn('[scanRoutes] Note: unique index on cms_routes.path:', idxErr.message);
  }

  try {
    await db.collection('cms_page_content').createIndex({ path: 1 }, { unique: true });
  } catch (idxErr) {
    console.warn('[scanRoutes] Note: unique index on cms_page_content.path:', idxErr.message);
  }

  try {
    await db.collection('cms_seo').createIndex({ path: 1 }, { unique: true, sparse: true });
  } catch (idxErr) {
    console.warn('[scanRoutes] Note: unique index on cms_seo.path:', idxErr.message);
  }

  const routesBulkOps = [];
  const now = new Date();

  for (const r of validRoutes) {
    routesBulkOps.push({
      updateOne: {
        filter: { path: r.path },
        update: {
          $set: {
            path: r.path,
            type: r.type,
            aliasTarget: r.aliasTarget || null,
            status: r.status || 'active',
            filePath: r.filePath,
            websiteId: 'default',
            lastScanned: now,
            updatedAt: now,
          },
          $setOnInsert: {
            createdAt: now,
          },
        },
        upsert: true,
      }
    });
  }

  let created = 0;
  let updated = 0;

  if (routesBulkOps.length > 0) {
    const writeResult = await db.collection('cms_routes').bulkWrite(routesBulkOps);
    created = writeResult.upsertedCount || 0;
    updated = writeResult.matchedCount || writeResult.modifiedCount || 0;
  }

  // Refresh routes from DB to guarantee exact _id mappings for each route
  const currentDbRoutes = await db.collection('cms_routes').find({ websiteId: 'default' }).toArray();
  const currentRouteMap = new Map(currentDbRoutes.map(r => [r.path, r]));

  const contentBulkOps = [];

  for (const r of validRoutes) {
    const dbRoute = currentRouteMap.get(r.path);
    const routeIdStr = dbRoute ? dbRoute._id.toString() : r.path;

    // Automatically parse and sync latest sections, text, titles, logos, and media for static and alias pages
    if (r.type === 'static' || r.type === 'alias') {
      try {
        let targetPath = r.filePath;
        if (r.path === '/') {
          targetPath = 'app/Home/HomeClientPage.js';
        }

        const serviceMatch = r.path ? r.path.match(/^\/services\/([a-z0-9\-]+)$/) : null;
        const serviceSlug = serviceMatch ? serviceMatch[1] : (r.path === '/hire-us' ? 'hire-us' : null);

        let parsedSections = [];
        if (targetPath) {
          const absolutePath = path.join(process.cwd(), targetPath);
          if (fs.existsSync(absolutePath)) {
            parsedSections = parsePageContent(absolutePath, serviceSlug);
          }
        }

        if (parsedSections.length > 0) {
          const existingDoc = primaryContentMap.get(r.path);
          let updatedSections = [];

          if (existingDoc && Array.isArray(existingDoc.sections) && existingDoc.sections.length > 0) {
            updatedSections = parsedSections.map(parsedSec => {
              const existingSec = existingDoc.sections.find(
                s => s.sectionId === parsedSec.sectionId || s.sectionName === parsedSec.sectionName
              );
              if (!existingSec) return parsedSec;

              const mergedFields = {};
              for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
                let dbField = null;
                if (existingSec.fields) {
                  dbField = existingSec.fields[key] ||
                    Object.values(existingSec.fields).find(f => f && f.originalValue === parsedField.originalValue);
                }

                if (!dbField) {
                  mergedFields[key] = {
                    ...parsedField,
                    value: sanitizeFieldText(parsedField.value),
                    originalValue: sanitizeFieldText(parsedField.originalValue),
                  };
                } else {
                  const isCodeUpdated = dbField.originalValue && dbField.originalValue !== parsedField.originalValue;
                  const isUserUnedited = !dbField.value || dbField.value === dbField.originalValue;

                  let finalVal = (isCodeUpdated && isUserUnedited && parsedField.type !== 'image')
                    ? parsedField.value
                    : ((dbField.value !== undefined && dbField.value !== null) ? dbField.value : parsedField.value);

                  mergedFields[key] = {
                    ...parsedField,
                    value: sanitizeFieldText(finalVal),
                    originalValue: sanitizeFieldText(parsedField.originalValue || dbField.originalValue),
                    alt: dbField.alt !== undefined ? dbField.alt : parsedField.alt,
                    title: dbField.title !== undefined ? dbField.title : parsedField.title,
                    tag: dbField.tag !== undefined ? dbField.tag : parsedField.tag,
                  };
                }
              }

              return {
                ...parsedSec,
                sectionId: parsedSec.sectionId,
                sectionName: parsedSec.sectionName || existingSec.sectionName,
                fields: mergedFields,
              };
            });

            if (r.path !== '/') {
              for (const dbSec of existingDoc.sections) {
                const exists = parsedSections.some(s => s.sectionId === dbSec.sectionId || s.sectionName === dbSec.sectionName);
                if (!exists && dbSec.sectionId?.startsWith('sec_')) {
                  updatedSections.push(dbSec);
                }
              }
            }
          } else {
            updatedSections = parsedSections.map(sec => {
              const sanitizedFields = {};
              for (const [k, f] of Object.entries(sec.fields || {})) {
                sanitizedFields[k] = {
                  ...f,
                  value: sanitizeFieldText(f.value),
                  originalValue: sanitizeFieldText(f.originalValue),
                };
              }
              return { ...sec, fields: sanitizedFields };
            });
          }

          contentBulkOps.push({
            updateOne: {
              filter: { path: r.path },
              update: {
                $set: {
                  routeId: routeIdStr,
                  path: r.path,
                  websiteId: 'default',
                  sections: updatedSections,
                  status: existingDoc?.status || 'published',
                  version: existingDoc ? (existingDoc.version || 1) : 1,
                  updatedAt: now,
                },
                $setOnInsert: {
                  createdAt: now,
                }
              },
              upsert: true
            }
          });
        }
      } catch (secErr) {
        console.error(`Error syncing sections during scanRoutes for path ${r.path}:`, secErr);
      }
    }
  }

  // Execute bulk writes for maximum performance
  if (contentBulkOps.length > 0) {
    await db.collection('cms_page_content').bulkWrite(contentBulkOps);
  }

  // Archive missing routes
  const scannedPaths = new Set(validRoutes.map(r => r.path));
  const archiveIds = Array.from(currentRouteMap.values())
    .filter(r => !scannedPaths.has(r.path) && r.status !== 'archived' && r.path !== '/[slug]')
    .map(r => r._id);
  const archived = archiveIds.length;

  if (archived > 0) {
    await db.collection('cms_routes').updateMany(
      { _id: { $in: archiveIds } },
      { $set: { status: 'archived', updatedAt: now } }
    );
  }

  const finalRoutes = await getRoutesList();
  const publicPagesCount = finalRoutes.filter(r => r.type === 'static' || r.type === 'alias').length;
  const summary = {
    total: finalRoutes.length,
    publicPages: publicPagesCount,
    created,
    updated,
    archived,
  };

  Object.assign(finalRoutes, { routes: finalRoutes, summary });
  return finalRoutes;
}

export async function getRoutesList() {
  const db = await getDb();
  let routes = await db.collection('cms_routes').find({}).sort({ path: 1 }).toArray();

  if (routes.length === 0) {
    routes = await scanRoutes();
  }

  // Deduplicate by path as defense-in-depth and filter out legacy/archived/hidden routes
  const seen = new Set();
  const cleanRoutes = [];
  for (const r of routes) {
    const p = r.path;
    if (
      p === '/[slug]' ||
      p === '/blog/[slug]' ||
      p === '/technologies/[slug]' ||
      p === '/technologies/reactjs' ||
      r.type === 'blog' ||
      (p.startsWith('/blog/') && p !== '/blog') ||
      r.status === 'archived'
    ) {
      continue;
    }
    if (!seen.has(r.path)) {
      seen.add(r.path);
      cleanRoutes.push({
        ...r,
        _id: r._id.toString(),
      });
    }
  }

  return cleanRoutes;
}

export async function getSeoList() {
  try {
    const db = await getDb();
    const seoEntries = await db.collection('cms_seo').find({}).sort({ path: 1 }).toArray();
    const routes = await getRoutesList().catch(() => []);

    return routes
      .filter(route => {
        const p = route.path;
        if (
          p === '/[slug]' ||
          p === '/blog/[slug]' ||
          p === '/technologies/[slug]' ||
          p === '/technologies/reactjs' ||
          route.type === 'blog' ||
          (p.startsWith('/blog/') && p !== '/blog')
        ) {
          return false;
        }
        return true;
      })
      .map(route => {
        const seo = seoEntries.find(s => s.routeId?.toString() === route._id.toString() || s.path === route.path);
        return {
          _id: route._id.toString(),
          path: route.path,
          type: route.type,
          status: route.status,
          hasSeo: !!seo,
          seoScore: calculateSeoScore(seo),
          metaTitle: seo?.metaTitle || '',
          metaDescription: seo?.metaDescription || '',
          seoId: seo?._id?.toString() || null,
          updatedAt: seo?.updatedAt || null,
        };
      });
  } catch (err) {
    console.error('Error fetching SEO list:', err);
    return [];
  }
}

export async function getSeoEntry(routeId) {
  const db = await getDb();
  let filter = {};
  if (ObjectId.isValid(routeId)) {
    try {
      filter = { _id: new ObjectId(routeId) };
    } catch (e) {
      filter = { path: routeId };
    }
  } else {
    filter = { path: routeId };
  }

  const route = await db.collection('cms_routes').findOne(filter);
  const targetPath = route ? route.path : routeId;

  const orConditions = [{ path: targetPath }];
  if (targetPath) {
    const altPath = targetPath.endsWith('/') ? targetPath.slice(0, -1) : `${targetPath}/`;
    orConditions.push({ path: altPath });
    orConditions.push({ path: targetPath.toLowerCase() });
  }
  if (routeId) {
    orConditions.push({ routeId });
    if (ObjectId.isValid(routeId)) {
      try { orConditions.push({ routeId: new ObjectId(routeId) }); } catch (e) {}
    }
  }

  const seo = await db.collection('cms_seo').findOne({ $or: orConditions });

  if (!seo) {
    return {
      seo: {
        path: targetPath,
        metaTitle: '',
        metaDescription: '',
        metaKeywords: [],
        canonicalUrl: '',
        robots: { index: true, follow: true, noArchive: false, noSnippet: false },
        openGraph: { title: '', description: '', image: '', type: 'website', locale: 'en_US' },
        twitterCard: { cardType: 'summary_large_image', title: '', description: '', image: '' },
        schema: { type: 'WebPage', customSchema: '' },
        sitemap: { include: true, priority: 0.8, changeFrequency: 'weekly' },
      },
      isNew: true,
      seoScore: 0,
      route: route ? { ...route, _id: route._id.toString() } : null,
    };
  }

  return {
    seo: { ...seo, _id: seo._id.toString() },
    seoScore: calculateSeoScore(seo),
    isNew: false,
    route: route ? { ...route, _id: route._id.toString() } : null,
  };
}

export async function saveSeoEntry(routeId, seoData) {
  const db = await getDb();
  const route = await db.collection('cms_routes').findOne({
    $or: [
      { path: routeId },
      ...(ObjectId.isValid(routeId) ? [{ _id: new ObjectId(routeId) }] : [])
    ]
  });

  const path = route ? route.path : routeId;
  const doc = {
    routeId,
    path,
    ...seoData,
    updatedAt: new Date(),
  };

  const orConditions = [{ path }];
  const altPath = path.endsWith('/') ? path.slice(0, -1) : `${path}/`;
  orConditions.push({ path: altPath });
  if (routeId) orConditions.push({ routeId });

  await db.collection('cms_seo').updateOne(
    { $or: orConditions },
    { $set: doc, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );

  return { success: true, path };
}

export async function deleteSeoEntry(routeIdOrPath) {
  const db = await getDb();
  const orConditions = [{ path: routeIdOrPath }, { routeId: routeIdOrPath }];
  if (ObjectId.isValid(routeIdOrPath)) {
    try {
      orConditions.push({ _id: new ObjectId(routeIdOrPath) });
      orConditions.push({ routeId: new ObjectId(routeIdOrPath) });
    } catch (e) {}
  }
  const altPath = routeIdOrPath.endsWith('/') ? routeIdOrPath.slice(0, -1) : `${routeIdOrPath}/`;
  orConditions.push({ path: altPath });

  const result = await db.collection('cms_seo').deleteMany({ $or: orConditions });
  return { success: true, deletedCount: result.deletedCount };
}

export async function getPublishedContent(pathParam) {
  try {
    const db = await getDb();
    const content = await db.collection('cms_page_content').findOne({
      path: pathParam,
      status: 'published',
    });
    if (content) {
      return JSON.parse(JSON.stringify(content));
    }
    return null;
  } catch (err) {
    console.error(`getPublishedContent error for ${pathParam}:`, err);
    return null;
  }
}

export async function getPageContent(routeId) {
  const db = await getDb();
  let filter = {};
  if (ObjectId.isValid(routeId)) {
    filter = { _id: new ObjectId(routeId) };
  } else {
    filter = { path: routeId };
  }

  const route = await db.collection('cms_routes').findOne(filter);
  const pathUrl = route ? route.path : routeId;
  const serviceMatch = pathUrl ? pathUrl.match(/^\/services\/([a-z0-9\-]+)$/) : null;
  const serviceSlug = serviceMatch ? serviceMatch[1] : (pathUrl === '/hire-us' ? 'hire-us' : null);

  let parsedSections = [];
  const targetFilePath = pathUrl === '/' ? 'app/Home/HomeClientPage.js' : (route ? route.filePath : null);
  if (targetFilePath) {
    try {
      const absoluteFilePath = path.join(process.cwd(), targetFilePath);
      if (fs.existsSync(absoluteFilePath)) {
        parsedSections = parsePageContent(absoluteFilePath, serviceSlug);
      }
    } catch (parseErr) {
      console.error('Failed to parse page content dynamically:', parseErr);
    }
  }

  const dbContent = await db.collection('cms_page_content').findOne({ path: pathUrl });

  let mergedSections = [];

  if (parsedSections.length > 0) {
    const dbSecs = (dbContent && Array.isArray(dbContent.sections)) ? dbContent.sections : [];
    mergedSections = parsedSections.map(parsedSec => {
      const existingSec = dbSecs.find(s => s.sectionId === parsedSec.sectionId || s.sectionName === parsedSec.sectionName);
      if (!existingSec) {
        const sanitizedFields = {};
        for (const [k, f] of Object.entries(parsedSec.fields || {})) {
          sanitizedFields[k] = {
            ...f,
            value: sanitizeFieldText(f.value),
            originalValue: sanitizeFieldText(f.originalValue),
          };
        }
        return { ...parsedSec, fields: sanitizedFields };
      }

      // Strictly populate ONLY fields that exist in the active parsed section
      const mergedFields = {};
      for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
        let dbField = null;
        if (existingSec.fields) {
          dbField = existingSec.fields[key] ||
            Object.values(existingSec.fields).find(f => f && f.originalValue === parsedField.originalValue);
        }

        if (!dbField) {
          mergedFields[key] = {
            ...parsedField,
            value: sanitizeFieldText(parsedField.value),
            originalValue: sanitizeFieldText(parsedField.originalValue),
          };
        } else {
          const isCodeUpdated = dbField.originalValue && dbField.originalValue !== parsedField.originalValue;
          const isUserUnedited = !dbField.value || dbField.value === dbField.originalValue;

          let finalVal = (isCodeUpdated && isUserUnedited && parsedField.type !== 'image')
            ? parsedField.value
            : ((dbField.value !== undefined && dbField.value !== null) ? dbField.value : parsedField.value);

          mergedFields[key] = {
            ...parsedField,
            value: sanitizeFieldText(finalVal),
            originalValue: sanitizeFieldText(parsedField.originalValue || dbField.originalValue),
            alt: dbField.alt !== undefined ? dbField.alt : parsedField.alt,
            title: dbField.title !== undefined ? dbField.title : parsedField.title,
            tag: dbField.tag !== undefined ? dbField.tag : parsedField.tag,
          };
        }
      }

      return {
        ...parsedSec,
        sectionId: parsedSec.sectionId,
        sectionName: parsedSec.sectionName || existingSec.sectionName,
        fields: mergedFields,
      };
    });

    // For non-home pages, append any custom user-added sections from DB
    if (pathUrl !== '/' && Array.isArray(dbContent?.sections)) {
      for (const dbSec of dbContent.sections) {
        const exists = parsedSections.some(s => s.sectionId === dbSec.sectionId || s.sectionName === dbSec.sectionName);
        if (!exists && dbSec.sectionId?.startsWith('sec_')) {
          const sanitizedCustomFields = {};
          for (const [k, f] of Object.entries(dbSec.fields || {})) {
            sanitizedCustomFields[k] = {
              ...f,
              value: sanitizeFieldText(f.value),
              originalValue: sanitizeFieldText(f.originalValue),
            };
          }
          mergedSections.push({
            ...dbSec,
            fields: sanitizedCustomFields,
          });
        }
      }
    }
  } else if (dbContent && Array.isArray(dbContent.sections) && dbContent.sections.length > 0) {
    mergedSections = dbContent.sections.map(sec => {
      const sanitizedFields = {};
      for (const [k, f] of Object.entries(sec.fields || {})) {
        sanitizedFields[k] = {
          ...f,
          value: sanitizeFieldText(f.value),
          originalValue: sanitizeFieldText(f.originalValue),
        };
      }
      return { ...sec, fields: sanitizedFields };
    });
  }

  const responseContent = {
    path: pathUrl,
    sections: mergedSections,
    status: dbContent?.status || 'published',
    version: dbContent?.version || 1,
  };

  return {
    content: responseContent,
    isNew: !dbContent,
    route: route ? { ...route, _id: route._id.toString() } : null,
    templates: [],
  };
}

export async function savePageContent(routeId, contentData) {
  const db = await getDb();
  const route = await db.collection('cms_routes').findOne({
    $or: [
      { path: routeId },
      ...(ObjectId.isValid(routeId) ? [{ _id: new ObjectId(routeId) }] : [])
    ]
  });

  const pathUrl = route ? route.path : routeId;

  // Sanitize all field values so NO HTML/code markup is ever stored
  const sanitizedSections = (contentData.sections || []).map(sec => {
    const fields = {};
    for (const [k, f] of Object.entries(sec.fields || {})) {
      fields[k] = {
        ...f,
        value: sanitizeFieldText(f.value),
        originalValue: sanitizeFieldText(f.originalValue),
      };
    }
    return { ...sec, fields };
  });

  const doc = {
    routeId: route ? route._id.toString() : routeId,
    path: pathUrl,
    sections: sanitizedSections,
    status: 'published',
    version: (contentData.version || 1) + 1,
    updatedAt: new Date(),
  };

  await db.collection('cms_page_content').updateOne(
    { path: pathUrl },
    { $set: doc },
    { upsert: true }
  );

  try {
    updatePageFiles(contentData.sections || []);
  } catch (err) {
    console.warn('Page file write skipped:', err);
  }

  return { ok: true, success: true, path: pathUrl };
}

export async function getRedirectsList() {
  const db = await getDb();
  const redirects = await db.collection('cms_redirects').find({}).sort({ createdAt: -1 }).toArray();
  return redirects.map(r => ({
    ...r,
    _id: r._id.toString(),
  }));
}

export async function saveRedirect(redirectData) {
  const db = await getDb();
  const { fromPath, toPath, type = '301' } = redirectData;

  const doc = {
    fromPath,
    toPath,
    type,
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  await db.collection('cms_redirects').updateOne(
    { fromPath },
    { $set: doc },
    { upsert: true }
  );

  return { success: true };
}

export async function deleteRedirect(id) {
  const db = await getDb();
  await db.collection('cms_redirects').deleteOne({
    $or: [
      { _id: new ObjectId(id) },
      { fromPath: id }
    ]
  });
  return { success: true };
}

export async function getLogo() {
  const db = await getDb();
  const logo = await db.collection('settings').findOne({ key: 'logo' });
  return logo ? logo.value : null;
}

export async function getMediaLibrary(limit = 24, folder = '', search = '') {
  try {
    const db = await getDb();
    const collection = db.collection('cms_media');

    const filter = {};
    if (folder) filter.folder = folder;
    if (search) {
      filter.$or = [
        { fileName: { $regex: search, $options: 'i' } },
        { originalName: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await collection.countDocuments(filter);
    const media = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    const folders = await collection.distinct('folder');

    return {
      total,
      folders: (folders || []).filter(Boolean),
      media: (media || []).map(m => ({ ...m, _id: m._id.toString() })),
    };
  } catch (err) {
    console.error('Error in getMediaLibrary:', err);
    return { total: 0, folders: [], media: [] };
  }
}

export async function getReviewsList() {
  const db = await getDb();
  const reviews = await db.collection('reviews').find({}).sort({ createdAt: -1 }).toArray();
  return reviews.map(r => ({ ...r, _id: r._id.toString() }));
}

export async function getSettings() {
  const db = await getDb();
  const settings = await db.collection('settings').find({}).toArray();
  const settingsMap = {};
  for (const s of settings) {
    settingsMap[s.key] = s.value;
  }
  return settingsMap;
}

export async function getUsersList() {
  try {
    const db = await getDb();
    let users = await db.collection('cms_users').find({}).sort({ createdAt: -1 }).toArray();
    if (!users || users.length === 0) {
      users = await db.collection('users').find({}).sort({ createdAt: -1 }).toArray();
    }
    return users.map(u => ({ ...u, _id: u._id.toString() }));
  } catch (err) {
    console.error('Error in getUsersList:', err);
    return [];
  }
}

export async function getActivityLogs(limit = null) {
  try {
    const db = await getDb();
    let query = db.collection('cms_activity_logs').find({}).sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    let logs = await query.toArray();
    if (!logs || logs.length === 0) {
      let fallbackQuery = db.collection('activity_logs').find({}).sort({ createdAt: -1 });
      if (limit) fallbackQuery = fallbackQuery.limit(limit);
      logs = await fallbackQuery.toArray();
    }
    const total = await db.collection('cms_activity_logs').countDocuments({});
    return {
      logs: logs.map(l => ({ ...l, _id: l._id.toString() })),
      total
    };
  } catch (err) {
    console.error('Error in getActivityLogs:', err);
    return { logs: [], total: 0 };
  }
}

export async function getApplicationsList() {
  const db = await getDb();
  const apps = await db.collection('applications').find({}).sort({ createdAt: -1, _id: -1 }).toArray();
  return apps.map(a => ({ 
    ...a, 
    _id: a._id.toString(), 
    id: a._id.toString(),
    status: a.status || 'Pending',
  }));
}

export async function getBlogCommentsList(blogId = null) {
  const db = await getDb();
  let query = {};
  if (blogId && blogId !== true && blogId !== 'true' && blogId !== 'all') {
    if (ObjectId.isValid(blogId) && blogId.length === 24) {
      query = { blogId: blogId.toString() };
    } else {
      const blog = await db.collection('cms_blogs').findOne({ slug: blogId });
      if (blog) {
        query = { blogId: blog._id.toString() };
      } else {
        query = { blogId: blogId.toString() };
      }
    }
  }

  const comments = await db.collection('cms_blog_comments').find(query).sort({ createdAt: -1 }).toArray();

  const blogs = await db.collection('cms_blogs').find({}).toArray();
  const blogMap = {};
  blogs.forEach(b => {
    blogMap[b._id.toString()] = { title: b.title, slug: b.slug, coverImage: b.coverImage };
    blogMap[b.slug] = { title: b.title, slug: b.slug, coverImage: b.coverImage };
  });

  return comments.map(c => {
    const bInfo = blogMap[c.blogId] || { title: 'Blog Post', slug: '', coverImage: '' };
    return {
      ...c,
      _id: c._id.toString(),
      blogTitle: bInfo.title,
      blogSlug: bInfo.slug,
      blogImage: bInfo.coverImage,
    };
  });
}

export async function getBlogEntry(id) {
  const db = await getDb();
  const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { slug: id };
  const blog = await db.collection('cms_blogs').findOne(query);
  return blog ? { ...blog, _id: blog._id.toString() } : null;
}

export async function getBlogsList(all = false) {
  const db = await getDb();
  const query = all ? {} : { published: true };
  const blogs = await db.collection('cms_blogs').find(query).sort({ createdAt: -1 }).toArray();
  const commentsCol = db.collection('cms_blog_comments');
  const blogsWithCommentCounts = await Promise.all(blogs.map(async (blog) => {
    const commentCount = await commentsCol.countDocuments({ 
      blogId: blog._id.toString() 
    });
    return {
      ...blog,
      _id: blog._id.toString(),
      commentCount,
    };
  }));
  return blogsWithCommentCounts;
}

export async function getContactSubmissionsList() {
  const db = await getDb();
  const contacts = await db.collection('contact_submissions').find({}).sort({ createdAt: -1 }).toArray();
  return contacts.map(c => ({ ...c, _id: c._id.toString() }));
}
