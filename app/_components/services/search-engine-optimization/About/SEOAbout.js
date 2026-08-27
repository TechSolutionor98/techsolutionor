import React from 'react'
import Image from 'next/image'
import SEOAboutImg from '../../../../../components/Images/seoabout.png'

const SEOAbout = () => {
    return (
        <section className="py-10 bg-white px-6 font-sans">
            <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-30">

                {/* Left Content */}
                <div className="w-full lg:w-1/2">
                    <p className="text-black text-lg md:text-xl italic mb-4 font-medium">
                        The Leader in Digital Marketing & SEO
                    </p>
                    <h2 className="text-[40px] md:text-[56px] font-bold text-[#41B349] leading-tight mb-8">
                        ABOUT OUR <br /> COMPANY
                    </h2>

                    <p className="text-gray-700 text-base md:text-[17px] leading-relaxed mb-8">
                        As a leading digital marketing & SEO company, we help businesses across the UAE, Dubai, and global markets strengthen their online presence.
                        <br /><br />
                        With over a decade of experience, we combine:
                    </p>

                    <ul className="space-y-4 mb-10">
                        {['Technical SEO expertise', 'Conversion optimization', 'Content strategy', 'Performance marketing integration'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <p className="text-gray-700 text-base md:text-[17px] leading-relaxed mb-10">
                        Our mission is simple: deliver scalable organic growth and position your brand as an industry leader in both local and international markets.
                    </p>

                    <button className="bg-[#41B349] hover:bg-[#111111] text-white px-10 py-4 rounded-full text-lg">
                        More About Us
                    </button>
                </div>

              {/* Right Image Container */}
                <div className="w-full lg:w-[700px] relative">
                    <div className="bg-[#00B14F] p-2 shadow-xl">
                        <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
                            <Image
                                src={SEOAboutImg}
                                alt="About Tech Solutionor"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="h-25 md:h-35 lg:h-70 bg-[#41b39]"></div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default SEOAbout
