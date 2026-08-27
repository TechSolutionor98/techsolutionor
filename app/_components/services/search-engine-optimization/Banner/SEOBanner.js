import React from 'react'
import Image from 'next/image'
import SEOBannerImg from '../../../../../components/Images/Seobgbanner.png'

const SEOBanner = () => {
    return (
        <section className="relative w-full min-h-[500px] md:min-h-[650px] flex items-center overflow-hidden font-sans">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={SEOBannerImg}
                    alt="SEO Banner Background"
                    fill
                    className="object-cover bg-[#6d6d6d] z-10"
                    priority
                />
            </div>

            {/* Readability Overlay */}
            <div className="absolute inset-0 bg-[#6d6d6d]/30 z-[1]"></div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center">

                {/* Content Section - Shifted to the left */}
                <div className="w-full md:w-[60%] lg:w-[50%] text-left">
                    <h1 className="text-[32px] sm:text-[45px] lg:text-[55px] font-bold leading-[1.1] mb-8 text-[#41B349]">
                        Effective SEO Strategies <br className="hidden lg:block" />
                        to Maximize Your ROI <br className="hidden lg:block" />
                        and Online Growth
                    </h1>

                    <p className="text-white text-base md:text-lg lg:text-[19px] max-w-[650px] mb-12 leading-relaxed  drop-shadow-md">
                        We provide professional SEO services designed to help your business outrank competitors, increase organic traffic, and generate measurable revenue growth. As a results-driven Search Engine Optimization company, we help brands in Dubai, Abu Dhabi, and across the UAE dominate search rankings while expanding into global markets.
                    </p>

                    <button className="bg-[#41B349] text-black px-6 py-4 rounded-full text-[18px] transition-all duration-300 shadow-xl hover:scale-105">
                        Get A Quote
                    </button>
                </div>

            </div>
        </section>
    )
}

export default SEOBanner
