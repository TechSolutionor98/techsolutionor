import React from 'react';
import BlogHero from '../_components/Blog/BlogHero';
import BlogList from '../_components/Blog/BlogList';
import { generateCmsMetadata } from '@/lib/cms-fetch';
import { getBlogsList } from '@/lib/cms-service';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return generateCmsMetadata('/blog', {
    title: 'Tech Blog & Insights | Tech Solutionor',
    description: 'Read latest articles, technical guides, web development news, and SEO strategies from Tech Solutionor.',
  });
}

export default async function BlogPage() {
  let blogs = [];
  try {
    const list = await getBlogsList(false);
    blogs = JSON.parse(JSON.stringify(list)) || [];
  } catch (err) {
    console.error('Failed to fetch blogs for BlogPage:', err);
  }

  // Calculate dynamic categories and counts
  const categoryMap = {};
  blogs.forEach((b) => {
    const cat = (b.category || 'General').trim();
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  const categories = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    count,
  }));

  const recentPosts = blogs.slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <BlogHero />
      <BlogList
        posts={blogs}
        categories={categories}
        recentPosts={recentPosts}
      />
    </main>
  );
}
