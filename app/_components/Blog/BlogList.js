"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import BlogCard, { resolveImageUrl } from './BlogCard';
import BlogSidebar, { BlogSearchForm } from './BlogSidebar';
import { CardHeading, CardParagraph, ButtonText, SectionBadge } from '@/components/Typography';

const BlogList = ({ 
  posts = [], 
  categories = [], 
  recentPosts = [],
  initialCategory = 'all',
  initialSearch = ''
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams?.get('category') || initialCategory || 'all';
  const searchFromUrl = searchParams?.get('search') || initialSearch || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);

  // Sync state whenever the URL searchParams change
  useEffect(() => {
    const cat = searchParams?.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const q = searchParams?.get('search') || '';
    setSearchQuery(q);
  }, [searchParams]);

  const handleSelectCategory = (catName) => {
    const nextCat = catName || 'all';
    setSelectedCategory(nextCat);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    router.push('/blog', { scroll: false });
  };

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchCat = (() => {
        if (!selectedCategory || selectedCategory.toLowerCase() === 'all') return true;
        if (!post.category) return false;
        const postCat = post.category.toLowerCase().trim();
        const selCat = selectedCategory.toLowerCase().trim();
        const postCatSlug = postCat.replace(/[^a-z0-9]+/g, '-');
        const selCatSlug = selCat.replace(/[^a-z0-9]+/g, '-');
        return (
          postCat === selCat ||
          postCatSlug === selCat ||
          postCatSlug === selCatSlug
        );
      })();

      const matchSearch =
        !query ||
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        (Array.isArray(post.tags) && post.tags.some((t) => typeof t === 'string' && t.toLowerCase().includes(query)));
      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // The latest published blog is the first post in the full list
  const latestPost = posts[0] || null;
  // If search/category filter is active, show matching results in grid; otherwise show remaining posts after latestPost
  const isFiltering = searchQuery.trim() !== '' || (selectedCategory && selectedCategory.toLowerCase() !== 'all');
  const gridPosts = isFiltering ? filteredPosts : filteredPosts.slice(1);

  return (
    <section className="bg-white overflow-hidden py-10 md:py-14" id="blog-list">
      {/* Mobile Search Bar: Appears at the top of the Blogs page before blog posts/content */}
      <div className="lg:hidden container mx-auto px-5 md:px-10 mb-8 max-w-[1240px]">
        <BlogSearchForm
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Top Section: Latest Published Blog Post (Replaces Why SEO Audit Matters) */}
      {latestPost && !isFiltering && (
        <div className="container mx-auto px-5 md:px-10 mb-16 max-w-[1240px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 bg-white">
            {/* Left: Featured Image */}
            <div className="w-full lg:w-1/2">
              <Link href={`/blog/${latestPost.slug}`} className="block group">
                <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-h-[460px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-150">
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
              <div className="mb-3">
                <SectionBadge variant="light">Featured Article</SectionBadge>
              </div>

              <CardHeading as="h2" size="lg" theme="dark" className="text-2xl sm:text-3xl lg:text-[36px] leading-tight mb-4 group-hover:text-[#41B349] transition-colors">
                <Link href={`/blog/${latestPost.slug}`}>
                  {latestPost.title}
                </Link>
              </CardHeading>

              <CardParagraph size="lg" theme="slate" className="mb-6 line-clamp-4 leading-relaxed">
                {latestPost.excerpt ||
                  (latestPost.content
                    ? latestPost.content.replace(/<[^>]+>/g, '').slice(0, 220) + '...'
                    : '')}
              </CardParagraph>

              <div>
                <Link href={`/blog/${latestPost.slug}`}>
                  <button className="bg-[#41B349] hover:bg-[#369c3d] text-white px-7 py-3 rounded-full inline-flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md shadow-[#41B349]/25 hover:scale-[1.02]">
                    <ButtonText className="text-xs sm:text-sm">Read Article</ButtonText>
                    <span className="text-xs">→</span>
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
                <CardHeading as="h3" size="sm" theme="dark" className="mb-2">No articles found</CardHeading>
                <CardParagraph size="sm" theme="slate" className="mb-5 text-gray-500">
                  {isFiltering
                    ? 'Try clearing your search query or selecting another category.'
                    : 'Check back soon for more published articles!'}
                </CardParagraph>
                {isFiltering && (
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-[#41B349] hover:bg-[#369c3d] text-white rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    <ButtonText className="text-xs">Reset Filters</ButtonText>
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
              onSelectCategory={handleSelectCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              hideSearchOnMobile={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
