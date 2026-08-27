import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BlogCard = ({ post, isFeatured = false }) => {
    if (isFeatured) {
        return (
            <div className="flex flex-col lg:flex-row bg-white rounded-[20px] overflow-hidden shadow-lg border border-gray-100 mb-12 hover:shadow-2xl transition-all duration-300 group">
                <div className="lg:w-1/2 relative min-h-[300px] overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-[#41b349] font-bold text-[14px] uppercase tracking-widest mb-4">
                        {post.category}
                    </div>
                    <h2 className="text-[28px] md:text-[36px] font-bold text-black mb-6 leading-tight group-hover:text-[#41b349] transition-colors duration-300">
                        {post.title}
                    </h2>
                    <p className="text-gray-600 text-[16px] leading-[28px] mb-8">
                        {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                        <button className="bg-[#41b349] text-white px-8 py-3 rounded-full text-[15px] font-semibold hover:bg-black transition-all duration-300 w-fit">
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-[20px] overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className="relative h-[240px] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="text-[#41b349] font-bold text-[12px] uppercase tracking-widest mb-3">
                    {post.category}
                </div>
                <h3 className="text-[20px] md:text-[22px] font-bold text-black mb-4 leading-snug line-clamp-2 group-hover:text-[#41b349] transition-colors duration-300">
                    {post.title}
                </h3>
                <p className="text-gray-600 text-[14px] leading-[24px] mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="mt-auto">
                    <button className="bg-transparent border border-[#41b349] text-[#41b349] px-6 py-2 rounded-full text-[14px] font-semibold hover:bg-[#41b349] hover:text-white transition-all duration-300">
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default BlogCard
