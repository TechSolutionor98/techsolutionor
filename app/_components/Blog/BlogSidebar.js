"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { resolveImageUrl, formatDate } from './BlogCard';
import { CardHeading, ButtonText } from '@/components/Typography';

export const BlogSearchForm = ({ 
  searchQuery = '', 
  onSearchChange, 
  className = '' 
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [internalValue, setInternalValue] = useState(searchQuery);

  useEffect(() => {
    setInternalValue(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = internalValue.trim();
    if (pathname !== '/blog') {
      if (q) {
        router.push(`/blog?search=${encodeURIComponent(q)}`);
      } else {
        router.push('/blog');
      }
    } else {
      if (q) {
        router.push(`/blog?search=${encodeURIComponent(q)}`, { scroll: false });
      } else {
        router.push('/blog', { scroll: false });
      }
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs focus-within:border-[#41B349] focus-within:ring-1 focus-within:ring-[#41B349] transition-all">
        <input
          type="text"
          value={internalValue}
          onChange={handleChange}
          placeholder="Search articles & guides..."
          className="font-jakarta w-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
        />
        <button 
          type="submit"
          className="bg-[#41B349] hover:bg-[#369c3d] text-white px-5 py-3 transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Search blogs"
        >
          <FaSearch size={13} />
        </button>
      </form>
    </div>
  );
};

const BlogSidebar = ({ 
  categories = [], 
  recentPosts = [],
  selectedCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  hideSearchOnMobile = false
}) => {
  const pathname = usePathname();
  const isBlogListingPage = pathname === '/blog';

  const isCategorySelected = (cat) => {
    if (!selectedCategory || selectedCategory.toLowerCase() === 'all') return false;
    const current = selectedCategory.toLowerCase().trim();
    const currentSlug = current.replace(/[^a-z0-9]+/g, '-');
    const name = (cat.name || '').toLowerCase().trim();
    const slug = (cat.slug || name.replace(/[^a-z0-9]+/g, '-')).toLowerCase().trim();
    return current === name || current === slug || currentSlug === slug;
  };

  const getCategoryHref = (cat, isSelected) => {
    if (isSelected) {
      return '/blog';
    }
    return `/blog?category=${encodeURIComponent(cat.name)}`;
  };

  const sidebarTechServices = [
    { name: "Web Development", href: "/services" },
    { name: "App Development", href: "/services" },
    { name: "Software Development", href: "/services" },
    { name: "Cloud POS Systems", href: "/pos-development" },
    { name: "UI/UX Design", href: "/services" },
    { name: "SEO & Growth", href: "/claim-your-free-seo-audit" },
    { name: "React & Next.js", href: "/technologies" },
    { name: "Node.js & Python", href: "/technologies" },
    { name: "Dedicated Developers", href: "/hire-us" }
  ];

  return (
    <aside className="w-full flex flex-col gap-10">
      {/* Search Widget */}
      <BlogSearchForm
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        className={hideSearchOnMobile ? "hidden lg:block" : ""}
      />

      {/* Categories Widget */}
      <div>
        <CardHeading as="h3" size="sm" theme="dark" className="text-lg sm:text-xl mb-4">
          Categories
        </CardHeading>
        <ul className="space-y-2 font-jakarta text-sm">
          {categories.map((cat, idx) => {
            const isSelected = isCategorySelected(cat);
            return (
              <li key={cat.slug || cat.name || idx}>
                <Link
                  href={getCategoryHref(cat, isSelected)}
                  scroll={isBlogListingPage ? false : true}
                  onClick={(e) => {
                    if (
                      isBlogListingPage &&
                      onSelectCategory &&
                      !e.metaKey &&
                      !e.ctrlKey &&
                      !e.shiftKey &&
                      !e.altKey &&
                      e.button === 0
                    ) {
                      onSelectCategory(isSelected ? 'all' : cat.name);
                    }
                  }}
                  className={`w-full flex items-center justify-between py-1.5 px-3 rounded-xl transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#41B349]/10 text-[#2C9434] font-bold shadow-xs'
                      : 'text-gray-600 hover:text-[#41B349] hover:bg-gray-50 font-medium'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isSelected ? 'bg-[#41B349] text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {cat.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      {recentPosts.length > 0 && (
        <div>
          <CardHeading as="h3" size="sm" theme="dark" className="text-lg sm:text-xl mb-4">
            Recent Posts
          </CardHeading>
          <div className="space-y-4">
            {recentPosts.map((post, idx) => {
              const imgUrl = resolveImageUrl(post.coverImage || post.image);
              const postDate = formatDate(post.createdAt || post.date);
              return (
                <Link key={post._id || post.slug || idx} href={`/blog/${post.slug}`} className="flex items-start gap-3.5 group">
                  <div className="relative w-[75px] h-[65px] rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-150">
                    <img
                      src={imgUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <h4 className="font-jakarta text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#41B349] transition-colors">
                      {post.title}
                    </h4>
                    {postDate && (
                      <span className="font-jakarta text-[11px] font-medium text-gray-400 mt-1">
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

      {/* Technologies & Services Widget */}
      <div>
        <CardHeading as="h3" size="sm" theme="dark" className="text-lg sm:text-xl mb-4">
          Technologies & Services
        </CardHeading>
        <div className="flex flex-wrap gap-2">
          {sidebarTechServices.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="font-jakarta text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-[#41B349]/10 text-gray-700 hover:text-[#41B349] border border-gray-200 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
