import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'

const BlogSidebar = ({ categories, recentPosts }) => {
    return (
        <aside className="w-full lg:w-[350px] flex flex-col gap-10">
            {/* Search Widget */}
            <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
                <h3 className="text-[20px] font-bold text-black mb-6">Search</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-3 outline-none focus:border-[#41b349] transition-colors"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#41b349]">
                        <FaSearch />
                    </button>
                </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
                <h3 className="text-[20px] font-bold text-black mb-6">Categories</h3>
                <ul className="flex flex-col gap-4">
                    {categories.map((cat, idx) => (
                        <li key={idx}>
                            <Link
                                href={`/blog/category/${cat.slug}`}
                                className="flex items-center justify-between text-gray-600 hover:text-[#41b349] transition-colors group"
                            >
                                <span className="font-medium">{cat.name}</span>
                                <span className="bg-gray-50 group-hover:bg-[#41b349]/10 text-gray-400 group-hover:text-[#41b349] px-3 py-1 rounded-full text-[12px] transition-colors">
                                    {cat.count}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
                <h3 className="text-[20px] font-bold text-black mb-6">Recent Posts</h3>
                <div className="flex flex-col gap-6">
                    {recentPosts.map((post, idx) => (
                        <Link key={idx} href={`/blog/${post.slug}`} className="flex gap-4 group">
                            <div className="relative w-[80px] h-[80px] shrink-0 rounded-lg overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-[14px] font-bold text-black line-clamp-2 leading-tight group-hover:text-[#41b349] transition-colors">
                                    {post.title}
                                </h4>
                                <span className="text-[12px] text-gray-400 mt-2 font-medium">
                                    {post.date}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default BlogSidebar
