import { MetadataRoute } from 'next';
import { getDb } from '@/lib/mongodb';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://techsolutionor.com').replace(/\/+$/, '');

  // Base static pages
  const defaultPages = [
    '',
    '/about-us',
    '/contact-us',
    '/hire-us',
    '/our-portfolio',
    '/pos-development',
    '/privacy-policy',
    '/terms-and-conditions',
    '/career',
    '/become-a-partner',
    '/claim-your-free-seo-audit',
    '/blog',
  ];

  // Technology URLs
  const techPages = [
    '/technologies',
    '/technologies/laravel',
    '/technologies/javascript',
    '/technologies/reactjs',
    '/technologies/python',
    '/technologies/swift',
    '/technologies/php',
    '/technologies/wordpress',
    '/technologies/shopify',
    '/technologies/magento',
    '/technologies/css',
    '/technologies/flutter',
    '/technologies/figma',
    '/technologies/analytics',
    '/technologies/html',
    '/technologies/dotnet',
    '/technologies/angular',
    '/technologies/c-plus-plus',
    '/technologies/go',
  ];

  // Service URLs
  const servicePages = [
    '/services',
    '/services/web-development',
    '/services/app-development',
    '/services/ecommerce-development',
    '/services/graphic-design',
    '/services/social-media',
    '/services/digital-marketing',
    '/services/ppc-amazon-ads',
    '/services/google-ads',
    '/services/meta',
    '/services/search-engine-optimization',
    '/services/content-writing',
    '/services/call-center',
    '/services/software-development',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];
  const addedPaths = new Set<string>();

  // Fetch SEO entries and dynamic routes from DB
  let seoMap = new Map<string, any>();
  let db: any = null;

  try {
    db = await getDb();
    const seoEntries = await db.collection('cms_seo').find({ websiteId: 'default' }).toArray();
    for (const entry of seoEntries) {
      if (entry.path) {
        const clean = entry.path.trim();
        seoMap.set(clean, entry);
        const alt = clean.endsWith('/') ? clean.slice(0, -1) : `${clean}/`;
        seoMap.set(alt, entry);
        seoMap.set(clean.toLowerCase(), entry);
      }
    }
  } catch (err) {
    console.error('Error loading cms_seo for sitemap:', err);
  }

  const getSeoSettings = (pathUrl: string) => {
    const lookup = pathUrl === '' ? '/' : pathUrl;
    return seoMap.get(lookup) || null;
  };

  const addSitemapEntry = (
    pathUrl: string,
    defaultPriority: number = 0.8,
    defaultFrequency: any = 'weekly',
    fallbackLastModified: Date = new Date()
  ) => {
    const cleanPath = pathUrl === '' ? '/' : (pathUrl.startsWith('/') ? pathUrl : `/${pathUrl}`);
    if (addedPaths.has(cleanPath)) return;

    const seo = getSeoSettings(pathUrl);

    // Dynamic inclusion check: Honor Admin SEO Settings
    if (seo) {
      if (seo.sitemap?.include === false || seo.robots?.index === false) {
        return; // Excluded dynamically via admin
      }
    }

    addedPaths.add(cleanPath);

    const priority = (seo?.sitemap?.priority !== undefined && seo?.sitemap?.priority !== null)
      ? Number(seo.sitemap.priority)
      : defaultPriority;

    const changeFrequency = seo?.sitemap?.changeFrequency || defaultFrequency;
    const lastModified = seo?.updatedAt ? new Date(seo.updatedAt) : fallbackLastModified;

    const url = pathUrl === '' ? baseUrl : `${baseUrl}${pathUrl.startsWith('/') ? pathUrl : `/${pathUrl}`}`;

    sitemapEntries.push({
      url,
      lastModified,
      changeFrequency,
      priority,
    });
  };

  // 1. Add base static pages
  for (const pagePath of defaultPages) {
    addSitemapEntry(pagePath, pagePath === '' ? 1.0 : 0.8, pagePath === '' ? 'daily' : 'weekly');
  }

  // 2. Add technology pages
  for (const pagePath of techPages) {
    addSitemapEntry(pagePath, 0.8, 'daily');
  }

  // 3. Add service pages
  for (const pagePath of servicePages) {
    addSitemapEntry(pagePath, 0.8, 'daily');
  }

  // 4. Dynamic CMS routes and Blogs
  if (db) {
    try {
      // Published blog posts
      const blogs = await db.collection('blogs').find({ status: 'published' }).toArray();
      for (const blog of blogs) {
        if (blog.slug) {
          const pagePath = `/${blog.slug}`;
          addSitemapEntry(pagePath, 0.64, 'daily', blog.updatedAt ? new Date(blog.updatedAt) : new Date());
        }
      }

      // Dynamic CMS routes
      const cmsRoutes = await db.collection('cms_routes').find({ websiteId: 'default', status: 'active' }).toArray();
      for (const route of cmsRoutes) {
        if (
          route.path &&
          !route.path.includes('[') &&
          !route.path.startsWith('/admin') &&
          !route.path.startsWith('/api') &&
          route.path !== '/technologies/react' &&
          route.path !== '/services/hire-us'
        ) {
          const pagePath = route.path.startsWith('/') ? route.path : `/${route.path}`;
          addSitemapEntry(pagePath, 0.8, 'daily', route.updatedAt ? new Date(route.updatedAt) : new Date());
        }
      }
    } catch (error) {
      console.error('Error loading dynamic routes for sitemap:', error);
    }
  }

  return sitemapEntries;
}
