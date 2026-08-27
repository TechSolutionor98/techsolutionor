import React from 'react'
import Image from 'next/image'
import LocalSEOIcon from '../../../../../components/Images/seoicon1.png' // Placeholder
import KeywordIcon from '../../../../../components/Images/seoicon2.png' // Placeholder
import AnalyticsIcon from '../../../../../components/Images/seoicon3.png' // Placeholder
import EcommerceIcon from '../../../../../components/Images/seoicon4.png' // Placeholder
import LinkBuildingIcon from '../../../../../components/Images/seoicon5.png'//Placeholder
import ContentIcon from '../../../../../components/Images/seoicon6.png' // Placeholder
import SeoBgImg from '../../../../../components/Images/seoservicesbg.png'

const SEOServices = () => {
    const services = [
        {
            title: "LOCAL SEO",
            desc: "Our proven local SEO strategies help you capture high-intent customers by ranking for “near me” and location-based searches. This includes optimizing your Google Business Profile (GBP), building accurate business citations, and enhancing local visibility across the UAE and global markets.",
            icon: LocalSEOIcon
        },
        {
            title: "KEYWORD RESEARCH",
            desc: "We use advanced keyword research techniques to lay the foundation for your SEO strategy. We identify the most relevant, high-value keywords for your business, ensuring the right intent reaches your target audience, no matter the industry or location.",
            icon: KeywordIcon
        },
        {
            title: "ANALYTICS & REPORTING",
            desc: "Understanding what’s working in your digital marketing is essential. We provide detailed analytics and reporting tools to track key performance indicators (KPIs), measure results, and make data-driven decisions that boost growth.",
            icon: AnalyticsIcon
        },
        {
            title: "ECOMMERCE SEO",
            desc: "Tech Solutionor specializes in SEO for eCommerce platforms including Shopify, Wix, WooCommerce, and more. We optimize product pages, fix technical issues, and improve site structure to drive traffic, increase conversions, and grow online sales.",
            icon: EcommerceIcon
        },
        {
            title: "DIGITAL LINK BUILDING",
            desc: "Our link building services increase your website’s authority and visibility. By acquiring high-quality backlinks, we boost credibility, search performance, and organic traffic for long-term SEO success.",
            icon: LinkBuildingIcon
        },
        {
            title: "CONTENT CREATION",
            desc: "Our team of skilled content strategists, writers, and editors collaborate with your business to create content that resonates with your audience. Whether you operate in a niche industry or global market, we deliver SEO-friendly, engaging content that drives results.",
            icon: ContentIcon
        }
    ]

    return (
        <section
        style={{
    backgroundImage: `url(${SeoBgImg.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
        className="relative py-20  px-6">
            <div className="max-w-[1000px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[40px] font-bold text-[#262323] uppercase">
                        SEO SERVICES INCLUDE
                    </h2>
                    <div className="w-[600px] h-0.5  bg-[#41B349] mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 bg-[#ffffff] group cursor-pointer"
                        >
                            <div className="mb-6 w-16 h-16 relative overflow-hidden transition-transform duration-500 group-hover:scale-110">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    layout="fill"
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-[#41B349]  transition-colors duration-300 tracking-wider">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-[15px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button className="bg-[#41B349] hover:bg-[#ffffff] text-black px-8 py-3 rounded-full text-[18px]  transition-all duration-300 shadow-lg uppercase tracking-tight">
                        REQUEST A FREE PROPOSAL
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SEOServices
