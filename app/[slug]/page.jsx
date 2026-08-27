import { getDb } from '@/lib/mongodb';
import { notFound, redirect } from 'next/navigation';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export async function generateMetadata({ params }) {
  const { slug } = await params;
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
