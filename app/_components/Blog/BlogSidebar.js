"use client";
import React from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { resolveImageUrl, formatDate } from './BlogCard';

const BlogSidebar = ({ 
  categories = [], 
  recentPosts = [],
  selectedCategory = 'all',
  onSelectCategory = () => {},
  searchQuery = '',
  onSearchChange = () => {}
}) => {
  return (
    <aside className="w-full flex flex-col gap-10">
      {/* Search Widget */}
      <div>
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search ..."
            className="w-full px-4 py-2.5 text-sm text-gray-800 outline-none bg-transparent"
          />
          <button 
            type="submit"
            className="bg-[#41b349] hover:bg-black text-white px-5 py-3 transition-colors flex items-center justify-center cursor-pointer"
          >
            <FaSearch size={14} />
          </button>
        </form>
      </div>

      {/* Categories Widget */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2.5 text-sm">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory.toLowerCase() === (cat.name || '').toLowerCase();
            return (
              <li key={idx}>
                <button
                  onClick={() => onSelectCategory(isSelected ? 'all' : cat.name)}
                  className={`text-[#41b349] hover:underline font-medium text-left cursor-pointer transition-colors block ${
                    isSelected ? 'font-bold underline' : ''
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      {recentPosts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-5">Recent Posts</h3>
          <div className="space-y-5">
            {recentPosts.map((post, idx) => {
              const imgUrl = resolveImageUrl(post.coverImage || post.image);
              const postDate = formatDate(post.createdAt || post.date);
              return (
                <Link key={post._id || post.slug || idx} href={`/blog/${post.slug}`} className="flex items-start gap-3.5 group">
                  <div className="relative w-[75px] h-[65px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={imgUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#41b349] transition-colors">
                      {post.title}
                    </h4>
                    {postDate && (
                      <span className="text-[11px] text-gray-400 mt-1">
                        {postDate}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};

export default BlogSidebar;
