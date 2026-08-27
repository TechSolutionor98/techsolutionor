import React from 'react'
import Image from 'next/image'
import BlogIcon from '../../../../../components/Images/contenticon1.png'
import WebsiteIcon from '../../../../../components/Images/contenticon2.png'
import ArticleIcon from '../../../../../components/Images/contenticon3.png'
import CopywritingIcon from '../../../../../components/Images/contenticon4.png'
import ProductIcon from '../../../../../components/Images/contenticon5.png'
import SEOIcon from '../../../../../components/Images/contenticon6.png'

const ContentServices = () => {
    const services = [
        {
            title: "BLOG WRITING",
            desc: "Engage your audience with well-researched, insightful blog posts. Our writers craft content that resonates with readers, keeping them informed and entertained while driving organic traffic.",
            icon: BlogIcon
        },
        {
            title: "WEBSITE CONTENT",
            desc: "Your website is often the first impression for potential customers. We create compelling, SEO-friendly content for homepages, about us pages, services pages, and more, showcasing your brand and driving conversions.",
            icon: WebsiteIcon
        },
        {
            title: "ARTICLE WRITING",
            desc: "From industry-specific articles to general interest pieces, our content educates and informs your target audience, positioning your brand as a thought leader in your field.",
            icon: ArticleIcon
        },
        {
            title: "COPYWRITING",
            desc: "Our copywriting services create persuasive, compelling content that drives sales, strengthens your brand image, and encourages action across sales pages, product descriptions, ads, and more.",
            icon: CopywritingIcon
        },
        {
            title: "PRODUCT DESCRIPTIONS",
            desc: "We highlight the best features of your products with detailed, engaging descriptions that entice customers and drive sales.",
            icon: ProductIcon
        },
        {
            title: "SEO CONTENT",
            desc: "Our SEO content services cover everything from meta descriptions and tags to keyword-integrated articles, ensuring your content aligns with best practices for search visibility and audience engagement.",
            icon: SEOIcon
        }
    ]

    return (
        <section className="py-18 bg-white px-6">
            <div className="max-w-[1150px] mx-auto">
                <div className="text-center mb-10 px-4">
                    <div className="inline-block bg-[#262323] text-white md:px-38 py-9 rounded-xl shadow-[0_10px_10px_rgba(0,0,0,0.8)] mb-6">
                        <h2 className="text-[20px] md:text-[30px] font-bold uppercase tracking-wide">
                            Elevate Your Brand with High Quality Content
                        </h2>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-[28px] md:text-[38px] font-bold text-[#262323] uppercase mb-12  pl-4">
                        CONTENT SERVICES <br /> INCLUDES
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {services.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-6 hover:rounded-[30px] border-white shadow-[0px_10px_30px_rgba(0,0,0,0.05)]   hover:shadow-[0px_10px_10px_rgba(0,0,0,0.15)] hover:scale-110 transition-all duration-500 group pointer-events-auto"
                        >
                            <div className="mb-8 w-18 h-18 relative overflow-hidden ">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    layout="fill"
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-[22px] mb-1 font-semibold text-[#41B349] uppercase leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-[16px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ContentServices
