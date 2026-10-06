import { getDb } from './mongodb';

const seoCache = new Map();
const contentCache = new Map();
const CACHE_TTL_MS = 60 * 1000;

function getCached(cache, key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    cache.delete(key);
    return null;
  }
  return item.value;
}

function setCached(cache, key, value) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function withTimeout(promise, ms = 2500, fallback = null) {
  let timer;
  const timeoutPromise = new Promise((resolve) => {
    timer = setTimeout(() => resolve(fallback), ms);
  });
  return Promise.race([
    promise.then((res) => {
      clearTimeout(timer);
      return res;
    }).catch(() => {
      clearTimeout(timer);
      return fallback;
    }),
    timeoutPromise,
  ]);
}

export async function getCmsSeo(path) {
  try {
    if (!path) return null;
    const cleanPath = path.trim();
    const cached = getCached(seoCache, cleanPath);
    if (cached !== null) return cached;

    return await withTimeout((async () => {
      const db = await getDb();
      const seo = await db.collection('cms_seo').findOne({ path: cleanPath });
      const result = seo || null;
      setCached(seoCache, cleanPath, result);
      return result;
    })(), 2500, null);
  } catch (err) {
    console.error(`getCmsSeo error for ${path}:`, err);
    return null;
  }
}

export async function getCmsContent(path) {
  try {
    if (!path) return null;
    const cleanPath = path.trim();
    const cached = getCached(contentCache, cleanPath);
    if (cached !== null) return cached;

    return await withTimeout((async () => {
      const db = await getDb();
      const content = await db.collection('cms_page_content').findOne({
        path: cleanPath,
        status: 'published',
      });

      if (!content) return null;

      const sections = {};
      for (const section of content.sections || []) {
        const key = section.sectionId || section.sectionName?.toLowerCase().replace(/\s+/g, '_') || `section_${section.order}`;
        const fields = {};
        for (const [fieldKey, field] of Object.entries(section.fields || {})) {
          fields[fieldKey] = field.value !== undefined ? field.value : field;
        }
        sections[key] = {
          name: section.sectionName,
          fields,
          raw: section.fields,
        };
      }

      const result = {
        sections,
        status: content.status,
        version: content.version,
        updatedAt: content.updatedAt,
      };
      setCached(contentCache, cleanPath, result);
      return result;
    })(), 2500, null);
  } catch (err) {
    console.error(`getCmsContent error for ${path}:`, err);
    return null;
  }
}

export async function getCmsData(path) {
  const [content, seo] = await Promise.all([
    getCmsContent(path),
    getCmsSeo(path),
  ]);

  return { content, seo };
}

export async function generateCmsMetadata(path, defaults = {}) {
  const seo = await getCmsSeo(path);

  const baseTitle = defaults.title || "Tech Solutionor";
  const baseDesc = defaults.description || "Tech Solutionor Technical Services and Engineering Solutions.";

  if (!seo) {
    return {
      title: baseTitle,
      description: baseDesc,
      openGraph: {
        title: baseTitle,
        description: baseDesc,
        type: 'website',
        locale: 'en_US',
        url: `https://techsolutionor.com${path === '/' ? '' : path}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: baseTitle,
        description: baseDesc,
      }
    };
  }

  const metadata = {
    title: seo.metaTitle || baseTitle,
    description: seo.metaDescription || baseDesc,
  };

  // Meta Keywords
  if (seo.metaKeywords) {
    if (Array.isArray(seo.metaKeywords) && seo.metaKeywords.length > 0) {
      metadata.keywords = seo.metaKeywords;
    } else if (typeof seo.metaKeywords === 'string' && seo.metaKeywords.trim()) {
      metadata.keywords = seo.metaKeywords.split(',').map(k => k.trim()).filter(Boolean);
    }
  }

  // Canonical URL
  if (seo.canonicalUrl && seo.canonicalUrl.trim()) {
    metadata.alternates = { canonical: seo.canonicalUrl.trim() };
  }

  // Robots
  if (seo.robots) {
    metadata.robots = {
      index: seo.robots.index !== false,
      follow: seo.robots.follow !== false,
      noarchive: !!seo.robots.noArchive,
      nosnippet: !!seo.robots.noSnippet,
    };
  }

  // Open Graph
  if (seo.openGraph || seo.metaTitle) {
    const og = seo.openGraph || {};
    metadata.openGraph = {
      title: og.title || seo.metaTitle || baseTitle,
      description: og.description || seo.metaDescription || baseDesc,
      type: og.type || 'website',
      locale: og.locale || 'en_US',
      url: seo.canonicalUrl || `https://techsolutionor.com${path === '/' ? '' : path}`,
    };

    const ogImage = og.image?.trim();
    if (ogImage) {
      metadata.openGraph.images = [{ url: ogImage }];
    }
  }

  // Twitter Card
  if (seo.twitterCard || seo.metaTitle) {
    const tw = seo.twitterCard || {};
    metadata.twitter = {
      card: tw.cardType || 'summary_large_image',
      title: tw.title || seo.openGraph?.title || seo.metaTitle || baseTitle,
      description: tw.description || seo.openGraph?.description || seo.metaDescription || baseDesc,
    };

    const twImage = tw.image?.trim() || seo.openGraph?.image?.trim();
    if (twImage) {
      metadata.twitter.images = [twImage];
    }
  }

  // Schema / Custom JSON
  if (seo.schema?.customSchema) {
    metadata.other = {
      'schema-custom-json': seo.schema.customSchema,
    };
  }

  return metadata;
}

export function getCmsJsonLd(seo, path = '') {
  if (!seo || !seo.schema) return null;

  if (seo.schema.customSchema && typeof seo.schema.customSchema === 'string' && seo.schema.customSchema.trim()) {
    try {
      return JSON.parse(seo.schema.customSchema.trim());
    } catch (e) {
      return seo.schema.customSchema.trim();
    }
  }

  const type = seo.schema.type || 'WebPage';
  const url = seo.canonicalUrl || `https://techsolutionor.com${path === '/' ? '' : path}`;
  const title = seo.metaTitle || 'Tech Solutionor';
  const description = seo.metaDescription || 'Tech Solutionor Technical Services and Engineering Solutions.';

  return {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "description": description,
    "url": url,
  };
}
