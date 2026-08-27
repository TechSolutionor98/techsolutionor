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
  const db = await getDb();
  const [contactCount, mediaCount, routesList] = await Promise.all([
    db.collection('submissions').countDocuments({}),
    db.collection('media').countDocuments({}),
    getRoutesList()
  ]);
  return {
    contactCount,
    pagesCount: routesList.length,
    mediaCount,
    websitesCount: 0,
  };
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

  const existingDbRoutes = await db.collection('cms_routes').find({}).toArray();
  for (const dbRoute of existingDbRoutes) {
    if (dbRoute.filePath) {
      const fullPath = path.join(process.cwd(), dbRoute.filePath);
      if (!fs.existsSync(fullPath) || dbRoute.path === '/[slug]' || dbRoute.path === '/technologies/react' || dbRoute.filePath.includes('[slug]')) {
        await db.collection('cms_routes').deleteOne({ _id: dbRoute._id });
      }
    }
  }

  // Sync to database
  for (const r of foundRoutes) {
    await db.collection('cms_routes').updateOne(
      { path: r.path },
      { $set: { ...r, websiteId: 'default', updatedAt: new Date() } },
      { upsert: true }
    );
  }

  return getRoutesList();
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
  const db = await getDb();
  const seoEntries = await db.collection('cms_seo').find({}).sort({ path: 1 }).toArray();
  const routes = await getRoutesList();

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
  if (route && route.filePath) {
    try {
      const absoluteFilePath = path.join(process.cwd(), route.filePath);
      parsedSections = parsePageContent(absoluteFilePath);
    } catch (parseErr) {
      console.error('Failed to parse page content dynamically:', parseErr);
    }
  }

  const dbContent = await db.collection('cms_page_content').findOne({ path: pathUrl });

  let mergedSections = parsedSections;

  if (dbContent && Array.isArray(dbContent.sections)) {
    mergedSections = parsedSections.map(parsedSec => {
      const existingSec = dbContent.sections.find(s => s.sectionId === parsedSec.sectionId || s.sectionName === parsedSec.sectionName);
      if (!existingSec) return parsedSec;

      const mergedFields = { ...parsedSec.fields };
      for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
        const dbField = existingSec.fields?.[key];
        if (dbField && dbField.value !== undefined) {
          mergedFields[key] = {
            ...parsedField,
            value: dbField.value,
          };
        }
      }

      return {
        ...parsedSec,
        fields: mergedFields,
      };
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

  return { success: true, path: pathUrl };
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

export async function getMediaLibrary() {
  const db = await getDb();
  const media = await db.collection('media').find({}).sort({ createdAt: -1 }).toArray();
  return media.map(m => ({ ...m, _id: m._id.toString() }));
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
  const db = await getDb();
  const users = await db.collection('users').find({}).sort({ createdAt: -1 }).toArray();
  return users.map(u => ({ ...u, _id: u._id.toString() }));
}

export async function getActivityLogs() {
  const db = await getDb();
  const logs = await db.collection('activity_logs').find({}).sort({ createdAt: -1 }).toArray();
  return logs.map(l => ({ ...l, _id: l._id.toString() }));
}

export async function getApplicationsList() {
  const db = await getDb();
  const apps = await db.collection('applications').find({}).sort({ createdAt: -1 }).toArray();
  return apps.map(a => ({ ...a, _id: a._id.toString() }));
}

export async function getBlogCommentsList(blogId = null) {
  const db = await getDb();
  const query = blogId ? { blogId: blogId.toString() } : {};
  const comments = await db.collection('cms_blog_comments').find(query).sort({ createdAt: -1 }).toArray();
  return comments.map(c => ({ ...c, _id: c._id.toString() }));
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
