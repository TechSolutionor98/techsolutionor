"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BlogCard, { resolveImageUrl } from './BlogCard';
import BlogSidebar from './BlogSidebar';

const BlogList = ({ posts = [], categories = [], recentPosts = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat =
        selectedCategory === 'all' ||
        (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
      const matchSearch =
        !searchQuery.trim() ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(post.tags) && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // The latest published blog is the first post in the full list
  const latestPost = posts[0] || null;
  // If search/category filter is active, show matching results in grid; otherwise show remaining posts after latestPost
  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'all';
  const gridPosts = isFiltering ? filteredPosts : filteredPosts.slice(1);

  return (
    <section className="bg-white overflow-hidden py-10 md:py-14" id="blog-list">
      {/* Top Section: Latest Published Blog Post (Replaces Why SEO Audit Matters) */}
      {latestPost && !isFiltering && (
        <div className="container mx-auto px-5 md:px-10 mb-16 max-w-[1240px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 bg-white rounded-3xl p-4 md:p-6 shadow-xs border border-gray-100">
            {/* Left: Featured Image */}
            <div className="w-full lg:w-1/2">
              <Link href={`/blog/${latestPost.slug}`} className="block group">
                <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-h-[460px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src={resolveImageUrl(latestPost.coverImage || latestPost.image)}
                    alt={latestPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#41b349] leading-tight mb-4 group-hover:text-black transition-colors">
                <Link href={`/blog/${latestPost.slug}`}>
                  {latestPost.title}
                </Link>
              </h2>

              <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed mb-6 line-clamp-4">
                {latestPost.excerpt ||
                  (latestPost.content
                    ? latestPost.content.replace(/<[^>]+>/g, '').slice(0, 220) + '...'
                    : '')}
              </p>

              <div>
                <Link href={`/blog/${latestPost.slug}`}>
                  <button className="bg-[#41b349] hover:bg-black text-white px-6 py-2.5 rounded text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs">
                    Explore More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Blog Articles & Sidebar Layout */}
      <div className="container mx-auto px-5 md:px-10 max-w-[1240px]">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Remaining Blog Posts Grid */}
          <div className="w-full lg:w-2/3">
            {gridPosts.length === 0 ? (
              <div className="text-center py-16 px-6 bg-gray-50 rounded-2xl border border-gray-150">
                <p className="text-gray-700 font-bold text-lg mb-2">No articles found</p>
                <p className="text-gray-400 text-sm mb-4">
                  {isFiltering
                    ? 'Try clearing your search query or selecting another category.'
                    : 'Check back soon for more published articles!'}
                </p>
                {isFiltering && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-5 py-2 bg-[#41b349] hover:bg-black text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {gridPosts.map((post) => (
                  <BlogCard key={post._id || post.slug} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-1/3">
            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
