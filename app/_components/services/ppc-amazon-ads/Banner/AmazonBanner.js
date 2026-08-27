import React from 'react'
import Image from 'next/image'
import PPCImg from '../../../../../components/Images/ppcbanner.png'

const AmazonBanner = () => {
    return (
        <section className="bg-neutral-900 w-full h-[6 00px] flex items-center relative overflow-hidden font-sans">
            {/* Background pattern/overlay (optional if visible in screenshot) */}
            <div className="absolute inset-0 bg-[#383838] z-0"></div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                {/* Left Text Content */}
                <div className="w-full md:w-[55%] text-white text-center md:text-left">
                    <h1 className="text-[28px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.1] mb-8">
                        PPC Advertising & <br className="hidden lg:block" />
                        Amazon Ads <br className="hidden lg:block" />
                        Management Services to <br className="hidden lg:block" />
                        Boost Sales
                    </h1>

                    <p className="text-gray-300 text-[#14px] md:text-[18px] max-w-[600px] mb-10 leading-relaxed">
                        Drive targeted traffic and maximize ROI with our PPC advertising and
                        Amazon ads management services in Dubai, Abu Dhabi, UAE, and
                        globally. Our expert team creates high-performing paid campaigns
                        designed to increase conversions, grow sales, and elevate your brand in
                        local and international marketplaces.
                    </p>

                    <button className="bg-[#41B349] hover:bg-[#ffffff] hover:text-black text-white px-8 py-3  text-[#20] font-bold transition-all duration-300 shadow-lg hover:shadow-[#41B349]/20">
                        Get A Free Quote
                    </button>
                </div>

                {/* Right Image Section */}
                <div className="w-full md:w-[45%] flex justify-center md:justify-end">
                    <div className="relative w-full max-w-[550px]">
                        <Image
                            src={PPCImg}
                            alt="PPC Expert Illustration"
                            priority
                            layout="responsive"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default AmazonBanner
