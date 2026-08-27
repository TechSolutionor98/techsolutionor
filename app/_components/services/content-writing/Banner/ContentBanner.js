import React from 'react'
import Image from 'next/image'
import ContentImg from '../../../../../components/Images/cwbanner.png'

const ContentBanner = () => {
    return (
        <section className="bg-[#41B349] w-full min-h-[300px] md:min-h-[400px] flex items-center justify-center relative overflow-hidden font-sans py-12 px-4 md:px-0">
            {/* The Floating Container */}
            <div
                className="relative z-10 w-full max-w-[1100px] min-h-[400px] bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row shadow-[0px_20px_50px_rgba(0,0,0,0.2)]"
                style={{ zIndex: 20 }}
            >
                {/* Left Side: Green with Text */}
                <div className="w-full md:w-[50%] bg-[#41B349] p-8 md:p-10 flex flex-col justify-center text-white">
                    <h1 className="text-[32px] sm:text-[30px] font-semibold lg:text-[40px] tracking-widest leading-[1.1] mb-6 uppercase">
                        High‑Quality Content Writing Services for SEO & Engagement
                    </h1>

                    <p className="text-white/90 text-[12px] md:text-[14px] leading-relaxed max-w-[500px]">
                        At <span className="font-bold">Tech Solutionor</span>, we understand the power of words. Our professional content writing services are designed to connect your brand with your audience, enhance your online presence, and drive measurable business results in the UAE and global markets.
                    </p>
                </div>

                {/* Right Side: Image */}
                <div className="w-full md:w-[50%] border-[15px] border-[#41b349] relative min-h-[250px] md:min-h-full bg-gray-100 flex items-center justify-center">
                    <Image
                        src={ContentImg}
                        alt="Content Writing"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default ContentBanner
