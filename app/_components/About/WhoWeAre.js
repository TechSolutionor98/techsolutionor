import React from "react";
import Image from "next/image";
import AboutImage from "../../../components/Images/about-img.jpg";

const WhoWeAre = () => {
    return (
        <div className="w-full bg-white py-16 md:py-15">
            <div className="max-w-[1140px] mx-auto px-5 flex flex-col md:flex-row items-center gap-15">
                {/* Left: Circular Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className="relative w-[200px] h-[300px] sm:w-[300px] sm:h-[400px] md:w-[400px] md:h-[500px] ">
                        <Image
                            src={AboutImage}
                            alt="Who We Are"
                            fill
                            className="object-conatin"
                        />
                    </div>
                </div>

                {/* Right: Content */}
                <div className="w-full md:w-1/2 text-left -pt-10">
                    <div className="inline-flex items-center gap-2 bg-[#41b349] text-white px-6 py-2  text-[18px] font-bold mb-4 shadow-xl ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                            <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
                        </svg>
                         Who We Are
                    </div>
                    <h2 className="text-[#262323] text-[32px] md:text-[43px] font-bold leading-tight mb-4">
                        We Are a Dynamic Team of Creative Designers and Developers
                    </h2>
                    <p className="text-gray-600 text-base md:text-[15px] mb-6 leading-relaxed">
                        With over 10 years of experience, we provide expert consulting, business solutions, and technology services that protect, enhance, and grow your business. Our team combines creativity, technical expertise, and strategic insight to deliver results that matter.
                    </p>
                    <button className="bg-[#262323] text-white px-8 py-3.5 rounded-none font-bold text-[16px] tracking-wide uppercase transition-all duration-300 hover:bg-[#41b349] hover:shadow-lg">
                        ABOUT OUR AGENCY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhoWeAre;
