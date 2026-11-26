import { getDb } from './mongodb.js';

const seoCache = new Map();
const contentCache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

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

export function invalidateCmsCache(path) {
  if (path) {
    const clean = path.trim();
    const alt = clean.endsWith('/') ? clean.slice(0, -1) : `${clean}/`;
    seoCache.delete(clean);
    seoCache.delete(alt);
    contentCache.delete(clean);
    contentCache.delete(alt);
  } else {
    seoCache.clear();
    contentCache.clear();
  }
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
      const altPath = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : `${cleanPath}/`;
      
      const seo = await db.collection('cms_seo').findOne({
        $or: [
          { path: cleanPath },
          { path: altPath },
          { path: cleanPath.toLowerCase() }
        ]
      });
      
      const result = seo ? JSON.parse(JSON.stringify(seo)) : null;
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
      const altPath = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : `${cleanPath}/`;

      let content = await db.collection('cms_page_content').findOne({
        $or: [
          { path: cleanPath },
          { path: altPath }
        ],
        status: 'published',
      });

      if (!content) {
        content = await db.collection('cms_page_content').findOne({
          $or: [
            { path: cleanPath },
            { path: altPath }
          ]
        });
      }

      const result = content ? JSON.parse(JSON.stringify(content)) : null;
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

  return {
    content: content ? JSON.parse(JSON.stringify(content)) : null,
    seo: seo ? JSON.parse(JSON.stringify(seo)) : null,
  };
}

export async function generateCmsMetadata(path, defaults = {}) {
  const seo = await getCmsSeo(path);

  const baseTitle = defaults.title || "TechSolutionor | Web Development, POS, WA Tools & SEO Services";
  const baseDesc = defaults.description || "TechSolutionor delivers cutting-edge web & mobile app development, Cloud POS & ERP systems, WhatsApp marketing tools, and SEO growth solutions to scale your business worldwide.";
  const defaultOgImage = 'https://techsolutionor.com/og-image.png';

  const defaultVerification = {
    other: {
      'msvalidate.01': 'FD0260234609FF418A3C532AF7A69169',
      ...(defaults.verification?.other || {}),
    },
    ...defaults.verification,
  };

  const canonicalFallback = `https://techsolutionor.com${path === '/' ? '' : path}`;

  if (!seo) {
    return {
      metadataBase: new URL('https://techsolutionor.com'),
      title: baseTitle,
      description: baseDesc,
      alternates: { canonical: canonicalFallback },
      openGraph: {
        title: baseTitle,
        description: baseDesc,
        type: 'website',
        locale: 'en_US',
        siteName: 'TechSolutionor',
        url: canonicalFallback,
        images: [
          {
            url: defaultOgImage,
            width: 1200,
            height: 630,
            type: 'image/png',
            alt: baseTitle,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: baseTitle,
        description: baseDesc,
        images: [defaultOgImage],
      },
      verification: defaultVerification,
    };
  }

  const metadata = {
    metadataBase: new URL('https://techsolutionor.com'),
    title: seo.metaTitle || baseTitle,
    description: seo.metaDescription || baseDesc,
    verification: defaultVerification,
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
  } else {
    metadata.alternates = { canonical: canonicalFallback };
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
  const og = seo.openGraph || {};
  const ogTitle = og.title || seo.metaTitle || baseTitle;
  const ogDesc = og.description || seo.metaDescription || baseDesc;
  let ogImage = og.image?.trim() || seo.metaImage?.trim() || seo.image?.trim();

  if (!ogImage) {
    ogImage = defaultOgImage;
  } else if (ogImage.startsWith('/')) {
    ogImage = `https://techsolutionor.com${ogImage}`;
  }

  metadata.openGraph = {
    title: ogTitle,
    description: ogDesc,
    type: og.type || 'website',
    locale: og.locale || 'en_US',
    siteName: 'TechSolutionor',
    url: seo.canonicalUrl || canonicalFallback,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        type: ogImage.endsWith('.jpg') || ogImage.endsWith('.jpeg') ? 'image/jpeg' : 'image/png',
        alt: ogTitle,
      },
    ],
  };

  // Twitter Card
  const tw = seo.twitterCard || {};
  let twImage = tw.image?.trim() || ogImage;
  if (twImage.startsWith('/')) {
    twImage = `https://techsolutionor.com${twImage}`;
  }

  metadata.twitter = {
    card: tw.cardType || 'summary_large_image',
    title: tw.title || ogTitle,
    description: tw.description || ogDesc,
    images: [twImage],
  };

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
