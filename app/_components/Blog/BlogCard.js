import React from 'react';
import Link from 'next/link';
import { CardHeading, CardParagraph, ButtonText } from '@/components/Typography';

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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 hover:shadow-md transition-all duration-300 group flex flex-col h-full">
      <Link href={`/blog/${post.slug}`} className="block relative h-[240px] overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {post.category && (
          <div className="mb-2">
            <span className="font-jakarta text-[11px] font-bold uppercase tracking-wider text-[#2C9434] bg-[#41B349]/10 px-2.5 py-0.5 rounded-full inline-block">
              {post.category}
            </span>
          </div>
        )}
        <CardHeading as="h3" size="sm" theme="dark" className="text-lg sm:text-xl mb-2.5 leading-snug line-clamp-2 group-hover:text-[#41B349] transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </CardHeading>
        <div className="flex items-center gap-2 font-jakarta text-xs text-gray-500 mb-3.5 flex-wrap">
          <span className="text-[#41B349] font-semibold">{post.author || 'Admin'}</span>
          {formattedDate && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-gray-400 font-medium">{formattedDate}</span>
            </>
          )}
        </div>
        <CardParagraph size="sm" theme="slate" className="mb-4 line-clamp-3 flex-grow">
          {post.excerpt || (post.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 140) + '...' : '')}
        </CardParagraph>
        <Link 
          href={`/blog/${post.slug}`} 
          className="inline-flex items-center gap-1.5 text-[#41B349] hover:text-[#369c3d] mt-auto font-jakarta transition-colors group/btn"
        >
          <ButtonText className="text-xs sm:text-sm">Read More</ButtonText>
          <span className="text-xs transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
