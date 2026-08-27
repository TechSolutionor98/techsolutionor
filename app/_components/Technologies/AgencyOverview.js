import React from 'react'
import Image from 'next/image'

const AgencyOverview = () => {
    return (
        <div className="w-full py-10 bg-white">
            <div className="max-w-[1080px] mx-auto px-5 md:px-10">
                <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
                    {/* Left Column */}
                    <div className="w-full md:w-5/12 mt-9">
                        <h2 className="text-[36px] md:text-[35px] font-bold  leading-tight mb-4">
                            TECH <br />
                            <span className="text-[#41B349]"> SOLUTIONOR</span> <br />
                            AGENCY
                        </h2>
                        <p className="text-gray-700 text-[15px] leading-relaxed">
                            Our technology solutions empower businesses to <br /> innovate and thrive in a competitive landscape.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-5/7">
                        <div className="flex flex-col items-center gap-4 mb-3">
                            <span className="text-[60px] md:text-[35px] font-bold text-black leading-none">10+</span>
                            <div className="text-[24px] md:text-[20px] font-semibold text-[#41B349] leading-tight">
                                Years of Experience
                            </div>
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed text-justify">
                            Our technology solutions are crafted to empower businesses with cutting-edge tools and strategies, enhancing operational efficiency and fostering innovation. We specialize in delivering tailored tech services that address unique challenges, ensuring your organization stays ahead in a competitive landscape. From software development to IT consultancy, our expertise covers a broad spectrum, driving growth and maximizing potential.
                        </p>
                    </div>
                </div>

                {/* Trending Tech Header */}
                <div className="mt-15 text-center">
                    <div className="inline-block bg-[#41B349] text-white text-[15px] font-semibold px-6 py-2  mb-4 ">
                        Technology Services
                    </div>
                    <h2 className="text-[28px] md:text-[35px] font-bold">
                        Trending Tech <span className="text-[#41B349]">Services</span>
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default AgencyOverview
