import React from 'react';
import Link from 'next/link';

export const resolveImageUrl = (img) => {
  if (!img) return '/images/blogabout.png';
  if (typeof img === 'string') return img;
  if (img.src) return img.src;
  return '/images/blogabout.png';
};

export const formatDate = (dateVal) => {
  if (!dateVal) return '';
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return String(dateVal);
  }
};

const BlogCard = ({ post }) => {
  if (!post) return null;
  const imageSrc = resolveImageUrl(post.coverImage || post.image);
  const formattedDate = formatDate(post.createdAt || post.date);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group flex flex-col h-full">
      <Link href={`/blog/${post.slug}`} className="block relative h-[240px] overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-[#41b349] transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <span className="text-[#41b349] font-medium">{post.author || 'admin'}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {post.excerpt || (post.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 140) + '...' : '')}
        </p>
        <Link href={`/blog/${post.slug}`} className="text-[#41b349] font-semibold text-xs sm:text-sm hover:underline mt-auto inline-block">
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
