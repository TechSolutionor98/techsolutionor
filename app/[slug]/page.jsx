import { getDb } from '@/lib/mongodb';
import { notFound, redirect } from 'next/navigation';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 3600;

// Fast rejection for common automated bot scans to prevent wasted MongoDB connections & Active CPU
const BOT_PROBE_REGEX = /\.(php|asp|aspx|jsp|env|git|json|xml|txt|sql|bak|yml|yaml|tar|gz|zip|ico|png|jpg|jpeg|webp|svg)$/i;
const BOT_PATH_PREFIXES = ['wp-', 'admin', 'api', 'phpmyadmin', 'cgi-bin', 'actuator', '.'];

function isBotProbe(slug) {
  if (!slug || typeof slug !== 'string') return true;
  if (BOT_PROBE_REGEX.test(slug)) return true;
  const lower = slug.toLowerCase();
  return BOT_PATH_PREFIXES.some(prefix => lower.startsWith(prefix));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (isBotProbe(slug)) {
    return { title: 'Not Found | Tech Solutionor' };
  }
  let blog = null;
  try {
    const db = await getDb();
    blog = await db.collection('cms_blogs').findOne({ slug, published: true });
  } catch (err) {}

  if (blog) {
    return generateCmsMetadata(`/${slug}`, {
      title: blog.metaTitle || `${blog.title} | Tech Solutionor`,
      description: blog.metaDescription || blog.excerpt || 'Tech Solutionor Insights',
    });
  }

  return generateCmsMetadata(`/${slug}`, {
    title: `${slug.replace(/-/g, ' ').toUpperCase()} | Tech Solutionor`,
    description: 'Tech Solutionor Insights and Technology Guide',
  });
}

export default async function DynamicRootSlugPage({ params }) {
  const { slug } = await params;
  if (isBotProbe(slug)) {
    notFound();
  }

  let blogPost = null;
  try {
    const db = await getDb();
    blogPost = await db.collection('cms_blogs').findOne({ slug, published: true });
  } catch (err) {
    console.error('Error fetching blog post:', err);
  }

  if (blogPost) {
    redirect(`/blog/${slug}`);
  }

  notFound();
}
