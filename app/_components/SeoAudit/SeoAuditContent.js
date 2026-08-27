"use client"
import React from 'react'
import Image from 'next/image'
import SeoAuditMatterImg from '../../../components/Images/seo-audit-matter.png'

const SeoAuditContent = () => {
    return (
        <section className="bg-white overflow-hidden">
            {/* Why SEO Audit Matters Section */}
            <div className="container mx-auto px-5 md:px-10 py-10 pb-0 flex justify-center items-center w-full max-w-[1180px] mb-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 md:gap- ">
                    {/* Left Side: Illustration */}
                    <div className="w-full lg:w-5/4 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-[300px] aspect-square ml-15">
                            <Image
                                src={SeoAuditMatterImg}
                                alt="Why SEO Audit Matters Illustration"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full lg:w-7/4">
                       <span className="inline-block bg-[#262323] text-white px-6 py-[12px] text-[14px] font-semibold mb-6 tracking-normal normal-case leading-[14px] h-[38px] shadow-[0px_10px_6px_rgba(65,179,73,0.36)] rounded-[1px] transition duration-300 cursor-pointer ">
  Why SEO Audit Matters
</span>

                        <h2 className="text-3xl md:text-[20px] font-bold text-[#262323] mb-8 leading-tight">
                            Maximize Your Website Potential with a Professional SEO Audit
                        </h2>

                        <div className="space-y-6 text-gray-600 text-[16px] leading-[25px] text-justify">
                            <p>
                                A strategic SEO audit is the foundation of sustainable online growth. For businesses in Dubai, across the UAE, and competing globally, it reveals hidden technical issues, search intent gaps, and missed keyword opportunities. By improving site performance, mobile experience, and search visibility, you position your website to attract more qualified traffic, generate consistent leads, and increase revenue.
                            </p>
                            <p>
                                
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeoAuditContent
