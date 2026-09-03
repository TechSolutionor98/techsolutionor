import { getDb } from './mongodb.js';
import { ObjectId } from 'mongodb';
import { parsePageContent, updatePageFiles } from './cms-parser.js';
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
    const [contactCount, mediaCount, routesList] = await Promise.all([
      db.collection('contact_submissions').countDocuments({}).then(c => c || db.collection('submissions').countDocuments({})),
      db.collection('cms_media').countDocuments({}).then(c => c || db.collection('media').countDocuments({})),
      getRoutesList().catch(() => [])
    ]);
    return {
      contactCount,
      pagesCount: routesList.length,
      mediaCount,
      websitesCount: 1,
    };
  } catch (err) {
    console.error('Error fetching dashboard counts:', err);
    return {
      contactCount: 0,
      pagesCount: 0,
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
      if (item.name.startsWith('_') || item.name.startsWith('.') || item.name === 'api' || item.name === 'admin' || item.name.toLowerCase() === 'home' || item.name === '[slug]') {
        continue;
      }

      const fullPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        const subPrefix = routePrefix === '' ? `/${item.name}` : `${routePrefix}/${item.name}`;
        if (subPrefix === '/technologies/react') continue;
        scanDir(fullPath, subPrefix);
      } else if (item.isFile() && (item.name === 'page.js' || item.name === 'page.jsx' || item.name === 'page.tsx')) {
        const pathUrl = routePrefix === '' ? '/' : routePrefix;
        if (pathUrl === '/technologies/react') continue;
        const relativeFilePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        const isDynamic = pathUrl.includes('[') && pathUrl.includes(']');

        foundRoutes.push({
          path: pathUrl,
          type: isDynamic ? 'dynamic' : 'static',
          status: 'active',
          filePath: relativeFilePath,
          lastScanned: new Date(),
        });
      }
    }
  }

  scanDir(appDir);

  // Purge legacy src/app/ duplicate records, duplicate /Home route records, [slug] catch-all records, /technologies/react, and stale non-existent files
  await db.collection('cms_routes').deleteMany({
    $or: [
      { filePath: { $regex: '^src/app/' } },
      { path: '/Home' },
      { path: '/[slug]' },
      { path: '/technologies/react' },
      { filePath: { $regex: 'app/\\[slug\\]' } }
    ]
  });

  const initialDbRoutes = await db.collection('cms_routes').find({}).toArray();
  for (const dbRoute of initialDbRoutes) {
    if (dbRoute.filePath) {
      const fullPath = path.join(process.cwd(), dbRoute.filePath);
      if (!fs.existsSync(fullPath) || dbRoute.path === '/[slug]' || dbRoute.path === '/technologies/react' || dbRoute.filePath.includes('[slug]')) {
        await db.collection('cms_routes').deleteOne({ _id: dbRoute._id });
      }
    }
  }

  // Sync to database with bulk operations and full section/content synchronization
  const existingDbRoutes = await db.collection('cms_routes').find({}).toArray();
  const existingRouteMap = new Map(existingDbRoutes.map(r => [r.path, r]));

  const existingContentDocs = await db.collection('cms_page_content').find({}).toArray();
  const existingContentMap = new Map(existingContentDocs.map(c => [c.path, c]));

  let created = 0;
  let updated = 0;
  const routesBulkOps = [];
  const contentBulkOps = [];
  const now = new Date();

  for (const r of foundRoutes) {
    const existingRoute = existingRouteMap.get(r.path);
    if (existingRoute) {
      updated++;
      routesBulkOps.push({
        updateOne: {
          filter: { path: r.path },
          update: { $set: { ...r, websiteId: 'default', lastScanned: now, updatedAt: now } },
        }
      });
    } else {
      created++;
      routesBulkOps.push({
        insertOne: {
          document: { ...r, websiteId: 'default', lastScanned: now, createdAt: now, updatedAt: now }
        }
      });
    }

    const routeIdStr = existingRoute ? existingRoute._id.toString() : r.path;

    // Automatically parse and sync latest sections, text, titles, logos, and media for all pages
    try {
      let targetPath = r.filePath;
      if (r.path === '/') {
        targetPath = 'app/Home/HomeClientPage.js';
      }

      const serviceMatch = r.path ? r.path.match(/^\/services\/([a-z0-9\-]+)$/) : null;
      const serviceSlug = serviceMatch ? serviceMatch[1] : null;

      let parsedSections = [];
      if (targetPath) {
        const absolutePath = path.join(process.cwd(), targetPath);
        if (fs.existsSync(absolutePath)) {
          parsedSections = parsePageContent(absolutePath, serviceSlug);
        }
      }

      if (parsedSections.length > 0) {
        const existingDoc = existingContentMap.get(r.path);
        let updatedSections = [];

        if (existingDoc && Array.isArray(existingDoc.sections) && existingDoc.sections.length > 0) {
          // Frontend is the single source of truth for ALL pages:
          // Strictly map over parsedSections in their current layout order
          updatedSections = parsedSections.map(parsedSec => {
            const existingSec = existingDoc.sections.find(
              s => s.sectionId === parsedSec.sectionId || s.sectionName === parsedSec.sectionName
            );
            if (!existingSec) return parsedSec;

            // Strictly populate ONLY fields that exist in the active parsed section
            const mergedFields = {};
            for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
              let dbField = null;
              if (existingSec.fields) {
                dbField = existingSec.fields[key] ||
                  Object.values(existingSec.fields).find(f => f && f.originalValue === parsedField.originalValue);
              }

              if (!dbField) {
                mergedFields[key] = { ...parsedField };
              } else {
                const isCodeUpdated = dbField.originalValue && dbField.originalValue !== parsedField.originalValue;
                const isUserUnedited = !dbField.value || dbField.value === dbField.originalValue;

                if (isCodeUpdated && isUserUnedited && parsedField.type !== 'image') {
                  mergedFields[key] = {
                    ...parsedField,
                  };
                } else {
                  mergedFields[key] = {
                    ...parsedField,
                    value: (dbField.value !== undefined && dbField.value !== null) ? dbField.value : parsedField.value,
                    alt: dbField.alt !== undefined ? dbField.alt : parsedField.alt,
                    title: dbField.title !== undefined ? dbField.title : parsedField.title,
                    tag: dbField.tag !== undefined ? dbField.tag : parsedField.tag,
                  };
                }
              }
            }

            return {
              ...parsedSec,
              sectionId: existingSec.sectionId || parsedSec.sectionId,
              sectionName: existingSec.sectionName || parsedSec.sectionName,
              fields: mergedFields,
            };
          });
        } else {
          updatedSections = parsedSections;
        }

        contentBulkOps.push({
          updateOne: {
            filter: { path: r.path },
            update: {
              $set: {
                routeId: routeIdStr,
                path: r.path,
                sections: updatedSections,
                status: existingDoc?.status || 'published',
                version: (existingDoc?.version || 0) + 1,
                updatedAt: now,
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

  // Execute bulk writes for maximum performance
  if (routesBulkOps.length > 0) {
    await db.collection('cms_routes').bulkWrite(routesBulkOps);
  }
  if (contentBulkOps.length > 0) {
    await db.collection('cms_page_content').bulkWrite(contentBulkOps);
  }

  // Archive missing routes
  const scannedPaths = new Set(foundRoutes.map(r => r.path));
  const archiveIds = existingDbRoutes
    .filter(r => !scannedPaths.has(r.path) && r.status !== 'archived')
    .map(r => r._id);
  const archived = archiveIds.length;

  if (archived > 0) {
    await db.collection('cms_routes').updateMany(
      { _id: { $in: archiveIds } },
      { $set: { status: 'archived', updatedAt: now } }
    );
  }

  const finalRoutes = await getRoutesList();
  const summary = {
    total: finalRoutes.length,
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

  return routes
    .filter(r => r.path !== '/[slug]' && !r.filePath?.includes('[slug]') && r.path !== '/technologies/react')
    .map(r => ({
      ...r,
      _id: r._id.toString(),
    }));
}

export async function getSeoList() {
  try {
    const db = await getDb();
    const seoEntries = await db.collection('cms_seo').find({}).sort({ path: 1 }).toArray();
    const routes = await getRoutesList().catch(() => []);

    return routes
      .filter(route => route.path !== '/technologies/react')
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
    filter = { _id: new ObjectId(routeId) };
  } else {
    filter = { path: routeId };
  }

  const route = await db.collection('cms_routes').findOne(filter);
  const targetPath = route ? route.path : routeId;

  const seo = await db.collection('cms_seo').findOne({
    $or: [{ routeId }, { path: targetPath }]
  });

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

  await db.collection('cms_seo').updateOne(
    { path },
    { $set: doc },
    { upsert: true }
  );

  return { success: true, path };
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

  let parsedSections = [];
  const targetFilePath = pathUrl === '/' ? 'app/Home/HomeClientPage.js' : (route ? route.filePath : null);
  if (targetFilePath) {
    try {
      const absoluteFilePath = path.join(process.cwd(), targetFilePath);
      if (fs.existsSync(absoluteFilePath)) {
        parsedSections = parsePageContent(absoluteFilePath);
      }
    } catch (parseErr) {
      console.error('Failed to parse page content dynamically:', parseErr);
    }
  }

  const dbContent = await db.collection('cms_page_content').findOne({ path: pathUrl });

  let mergedSections = [];

  if (pathUrl === '/') {
    // For the Home page (/), enforce exact active sections order from HomeClientPage.js and prune deleted sections (e.g. counter, page_content, main)
    if (parsedSections.length > 0) {
      const dbSecs = (dbContent && Array.isArray(dbContent.sections)) ? dbContent.sections : [];
      mergedSections = parsedSections.map(parsedSec => {
        const existingSec = dbSecs.find(s => s.sectionId === parsedSec.sectionId || s.sectionName === parsedSec.sectionName);
        if (!existingSec) return parsedSec;

        // Strictly populate ONLY fields that exist in the active parsed section
        const mergedFields = {};
        for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
          let dbField = null;
          if (existingSec.fields) {
            dbField = existingSec.fields[key] ||
              Object.values(existingSec.fields).find(f => f && f.originalValue === parsedField.originalValue);
          }

          if (!dbField) {
            mergedFields[key] = { ...parsedField };
          } else {
            const isCodeUpdated = dbField.originalValue && dbField.originalValue !== parsedField.originalValue;
            const isUserUnedited = !dbField.value || dbField.value === dbField.originalValue;

            if (isCodeUpdated && isUserUnedited && parsedField.type !== 'image') {
              mergedFields[key] = {
                ...parsedField,
              };
            } else {
              mergedFields[key] = {
                ...parsedField,
                value: (dbField.value !== undefined && dbField.value !== null) ? dbField.value : parsedField.value,
                alt: dbField.alt !== undefined ? dbField.alt : parsedField.alt,
                title: dbField.title !== undefined ? dbField.title : parsedField.title,
              };
            }
          }
        }

        return {
          ...parsedSec,
          sectionId: existingSec.sectionId || parsedSec.sectionId,
          sectionName: existingSec.sectionName || parsedSec.sectionName,
          fields: mergedFields,
        };
      });
    }
  } else if (dbContent && Array.isArray(dbContent.sections) && dbContent.sections.length > 0) {
    mergedSections = [...dbContent.sections];

    if (parsedSections && parsedSections.length > 0) {
      parsedSections.forEach(parsedSec => {
        const existingIdx = mergedSections.findIndex(s => s.sectionId === parsedSec.sectionId || s.sectionName === parsedSec.sectionName);
        if (existingIdx !== -1) {
          const existingSec = mergedSections[existingIdx];
          const mergedFields = { ...parsedSec.fields, ...existingSec.fields };

          for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
            const dbField = existingSec.fields?.[key];
            if (dbField) {
              const isCodeUpdated = dbField.originalValue && dbField.originalValue !== parsedField.originalValue;
              const isUserUnedited = !dbField.value || dbField.value === dbField.originalValue;

              if (isCodeUpdated && isUserUnedited && parsedField.type !== 'image') {
                mergedFields[key] = {
                  ...dbField,
                  value: parsedField.value,
                  originalValue: parsedField.originalValue,
                  label: parsedField.label || dbField.label,
                };
              }
            }
          }

          mergedSections[existingIdx] = {
            ...parsedSec,
            ...existingSec,
            fields: mergedFields,
          };
        } else {
          mergedSections.push(parsedSec);
        }
      });
    }
  } else if (parsedSections && parsedSections.length > 0) {
    mergedSections = parsedSections;
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
  const doc = {
    routeId: route ? route._id.toString() : routeId,
    path: pathUrl,
    sections: contentData.sections || [],
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
  const apps = await db.collection('applications').find({}).sort({ createdAt: -1 }).toArray();
  return apps.map(a => ({ ...a, _id: a._id.toString() }));
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
