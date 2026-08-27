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
    '/technologies/meta',
    '/technologies/analytics',
    '/technologies/google-ads',
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
    '/services/search-engine-optimization',
    '/services/content-writing',
    '/services/call-center',
    '/services/software-development',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];
  const addedPaths = new Set<string>();

  // 1. Add base static pages
  for (const pagePath of defaultPages) {
    const url = pagePath === '' ? baseUrl : `${baseUrl}${pagePath}`;
    addedPaths.add(pagePath || '/');
    sitemapEntries.push({
      url,
      lastModified: new Date(),
      changeFrequency: pagePath === '' ? 'daily' : 'weekly',
      priority: pagePath === '' ? 1.0 : 0.8,
    });
  }

  // 2. Add technology pages
  for (const pagePath of techPages) {
    if (!addedPaths.has(pagePath)) {
      addedPaths.add(pagePath);
      sitemapEntries.push({
        url: `${baseUrl}${pagePath}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      });
    }
  }

  // 3. Add service pages
  for (const pagePath of servicePages) {
    if (!addedPaths.has(pagePath)) {
      addedPaths.add(pagePath);
      sitemapEntries.push({
        url: `${baseUrl}${pagePath}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      });
    }
  }

  // 4. Fetch dynamic published blog articles and CMS routes from MongoDB
  try {
    const db = await getDb();
    
    // Published blog posts (at root level /:slug per original SEO)
    const blogs = await db.collection('blogs').find({ status: 'published' }).toArray();
    for (const blog of blogs) {
      if (blog.slug) {
        const pagePath = `/${blog.slug}`;
        if (!addedPaths.has(pagePath)) {
          addedPaths.add(pagePath);
          sitemapEntries.push({
            url: `${baseUrl}${pagePath}`,
            lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
            changeFrequency: 'daily',
            priority: 0.64,
          });
        }
      }
    }

    // Dynamic CMS routes
    const cmsRoutes = await db.collection('cms_routes').find({ websiteId: 'default', status: 'active' }).toArray();
    for (const route of cmsRoutes) {
      if (
        route.path &&
        !route.path.includes('[') &&
        !route.path.startsWith('/admin') &&
        !route.path.startsWith('/api')
      ) {
        const pagePath = route.path.startsWith('/') ? route.path : `/${route.path}`;
        if (!addedPaths.has(pagePath)) {
          addedPaths.add(pagePath);
          sitemapEntries.push({
            url: `${baseUrl}${pagePath}`,
            lastModified: route.updatedAt ? new Date(route.updatedAt) : new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error loading dynamic sitemap entries:', error);
  }

  return sitemapEntries;
}
