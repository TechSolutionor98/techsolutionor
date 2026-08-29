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
      if (item.name.startsWith('_') || item.name.startsWith('.') || item.name === 'api' || item.name === 'admin') {
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

  // Purge any legacy src/app/ duplicate records
  await db.collection('cms_routes').deleteMany({ filePath: { $regex: '^src/app/' } });

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

  return routes.map(r => ({
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

  // Optionally update source files if requested
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


