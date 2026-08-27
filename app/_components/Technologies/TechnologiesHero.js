import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BannerPic from '../../../components/Images/technologybanner.png' // Placeholder, checking if this is correct
import TechBg from '../../../components/Images/technologybannerbg.svg' // Used as polygon placeholder on left

const TechnologiesHero = () => {
    return (
        <div className="relative w-full bg-[#262323] overflow-hidden min-h-[500px] flex items-center">
            {/* Background Polygons (Left) */}
            <div className="absolute top-0 left-0 opacity-60 rotate-0">
                <Image src={TechBg} alt="Tech Background" width={400} height={400} className="w-[350px] " />
            </div>

            <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between w-full">
                {/* Left Content */}
                <div className="w-full md:w-1/2 text-left mt-10 md:mt-0">
                    <div className="inline-block bg-[#41B349] text-white text-[15px] font-semibold px-4 py-2 mb-6 ">
                        Technology services
                    </div>
                    <h1 className="text-white text-[30px] md:text-[35px] font-bold leading-tight mb-6">
                        Modern Technologies <br />
                        Powering Our Digital <br />
                        <span className="text-[#41B349]">Solution.</span>
                    </h1>
                    <p className="text-gray-300 text-[16px] max-w-[430px] mb-8 leading-relaxed">
                        Delivering the best solutions starts with understanding your needs and customizing our approach to ensure exceptional results.
                    </p>
                    <Link href="#Technologies">
                        <button className="bg-[#41B349] text-white px-4 py-1.5  font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                            Discover More
                        </button>
                    </Link>
                </div>

                {/* Right Content - Circular Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-center mt-12 md:-mt-10">
                    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                        {/* Circular Sketchy Frame Placeholder */}
                        <div className="absolute inset-0 "></div>
                        <div className="absolute inset-2 overflow-hidden ">
                            {/* In a real scenario, this would be a specific image. Using webdevbannerpic.png for now */}
                            <Image 
                                src={BannerPic} 
                                alt="Technologies Specialist" 
                                fill 
                                className="object-contain "
                            />
                        </div>
                        {/* Rotating or Decorative Circle - If assets found */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TechnologiesHero
