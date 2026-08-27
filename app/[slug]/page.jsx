import { getDb } from '@/lib/mongodb';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let blog = null;
  try {
    const db = await getDb();
    blog = await db.collection('blogs').findOne({ slug });
  } catch (err) {}

  return generateCmsMetadata(`/${slug}`, {
    title: blog?.title || `${slug.replace(/-/g, ' ').toUpperCase()} | Tech Solutionor`,
    description: blog?.summary || 'Tech Solutionor Insights and Technology Guide',
  });
}

export default async function DynamicRootSlugPage({ params }) {
  const { slug } = await params;

  let blogPost = null;
  try {
    const db = await getDb();
    blogPost = await db.collection('blogs').findOne({ slug });
  } catch (err) {
    console.error('Error fetching blog post:', err);
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Tech Solutionor Insights</span>
          <h1 className="text-3xl font-extrabold capitalize">{slug.replace(/-/g, ' ')}</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            This article page is connected to your Admin Panel. You can add or edit full content for this URL via the <code className="bg-slate-900 px-2 py-1 rounded text-blue-300">/admin/blogs</code> portal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-gray-800 pb-8">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Tech Solutionor Blog</span>
          <h1 className="text-4xl font-extrabold mt-2 leading-tight">{blogPost.title}</h1>
          <p className="text-xs text-gray-500 mt-3">
            Published on {new Date(blogPost.updatedAt || Date.now()).toLocaleDateString()}
          </p>
        </div>

        <div
          className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
      </div>
    </article>
  );
}
