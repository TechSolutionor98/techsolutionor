import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogEntry, getBlogsList, getBlogCommentsList } from '@/lib/cms-service';
import { generateCmsMetadata } from '@/lib/cms-fetch';
import BlogSidebar from '@/app/_components/Blog/BlogSidebar';
import BlogCommentForm from './BlogCommentForm';
import { FaCalendarAlt, FaUser, FaClock, FaComment, FaTag, FaArrowLeft } from 'react-icons/fa';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogEntry(slug);

  if (!blog) {
    return generateCmsMetadata(`/blog/${slug}`, {
      title: 'Article Not Found | Tech Solutionor',
      description: 'The requested article could not be found.',
    });
  }

  return generateCmsMetadata(`/blog/${slug}`, {
    title: blog.metaTitle || `${blog.title} | Tech Solutionor Blog`,
    description: blog.metaDescription || blog.excerpt || 'Read our latest tech insights and guides.',
    keywords: blog.keywords || (Array.isArray(blog.tags) ? blog.tags.join(', ') : ''),
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  });
}

function formatDate(dateVal) {
  if (!dateVal) return '';
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return String(dateVal);
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogEntry(slug);

  if (!blog) {
    notFound();
  }

  // Fetch sidebar data
  const allBlogs = await getBlogsList(false);
  const recentPosts = allBlogs.filter((b) => b.slug !== slug).slice(0, 4);

  const categoryMap = {};
  allBlogs.forEach((b) => {
    const cat = (b.category || 'General').trim();
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  const categories = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    count,
  }));

  // Fetch approved comments for this blog
  let comments = [];
  try {
    const rawComments = await getBlogCommentsList(blog._id);
    comments = rawComments.filter((c) => c.approved === true || c.status === 'approved');
  } catch (err) {
    console.error('Failed to fetch comments for blog:', err);
  }

  const formattedDate = formatDate(blog.createdAt);
  const coverImage = blog.coverImage || '/images/blogabout.png';
  const readMinutes = blog.readMinutes || Math.max(3, Math.ceil((blog.content || '').split(/\s+/).length / 200));

  return (
    <article className="min-h-screen bg-white text-slate-800 pb-20">
      {/* Top Header / Breadcrumb Bar */}
      <div className="bg-gray-50 border-b border-gray-100 py-8">
        <div className="container mx-auto px-5 md:px-10 max-w-[1240px]">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-[#41b349] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#41b349] transition-colors">
              Blog
            </Link>
            {blog.category && (
              <>
                <span>/</span>
                <span className="text-[#41b349] font-medium">{blog.category}</span>
              </>
            )}
          </nav>

          {/* Category Badge */}
          {blog.category && (
            <span className="inline-block bg-[#41b349]/10 text-[#41b349] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              {blog.category}
            </span>
          )}

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 leading-tight mb-4 max-w-4xl">
            {blog.title}
          </h1>

          {/* Meta Info Bar */}
          <div className="flex items-center gap-5 text-xs text-gray-500 flex-wrap pt-1">
            <div className="flex items-center gap-1.5 font-medium text-gray-700">
              <FaUser className="text-[#41b349]" />
              <span>{blog.author || 'Admin'}</span>
            </div>
            {formattedDate && (
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-gray-400" />
                <span>{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <FaClock className="text-gray-400" />
              <span>{readMinutes} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaComment className="text-gray-400" />
              <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-5 md:px-10 max-w-[1240px] mt-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Main Column */}
          <div className="w-full lg:w-2/3">
            {/* Featured Cover Image */}
            {coverImage && (
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden mb-10 shadow-md bg-gray-100">
                <img
                  src={coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Excerpt Lead */}
            {blog.excerpt && (
              <div className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal mb-8 pb-6 border-b border-gray-100 italic">
                "{blog.excerpt}"
              </div>
            )}

            {/* Rich HTML Content */}
            <div
              className="prose max-w-none text-gray-800 leading-relaxed space-y-5 text-[16px] [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#41b349] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>img]:rounded-xl [&>img]:my-6 [&>img]:shadow-sm"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                  <FaTag className="text-[#41b349]" /> Tags:
                </span>
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 hover:bg-[#41b349]/10 hover:text-[#41b349] text-gray-600 px-3 py-1 rounded-full transition-colors"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Navigation back to blog list */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#41b349] hover:text-black transition-colors"
              >
                <FaArrowLeft /> Back to All Articles
              </Link>
            </div>

            {/* Comments List Section */}
            <div className="mt-14 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comments ({comments.length})
              </h3>

              {comments.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500 text-sm">
                  No comments yet. Be the first to leave your feedback!
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div
                      key={c._id}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#41b349] text-white font-bold flex items-center justify-center text-xs">
                            {(c.authorName || 'U')[0].toUpperCase()}
                          </div>
                          <span className="font-bold text-sm text-gray-900">
                            {c.authorName}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatDate(c.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed pl-10">
                        {c.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interactive Comment Form */}
              <BlogCommentForm blogId={blog._id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-6">
              <BlogSidebar
                categories={categories}
                recentPosts={recentPosts}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
