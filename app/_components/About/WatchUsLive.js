import React from "react";
import Image from "next/image";
import Link from "next/link";
import InnovationImage from "../../../components/Images/aboutbg1.webp";

const WatchUsLive = () => {
    return (
        <div className="w-full bg-[#41b349] overflow-hidden">
            <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row">
                {/* Left: Content */}
                <div className="w-full md:w-1/2 px-8 md:px-8 py-16 text-white flex flex-col justify-center">
                    <div className="bg-[#262323] px-4 py-2 inline-block w-fit text-sm font-bold uppercase mb-3">
                        WATCH US LIVE
                    </div>
                    <h2 className="text-[32px] md:text-[45px] font-bold leading-tight mb-8">
                        An Agency That Thrives on Innovation and Creativity
                    </h2>
                    <p className="text-white/90 text-base md:text-lg mb-0 leading-relaxed">
                        At TechSolutionor, we are passionate about delivering innovative and impactful solutions. Our team of skilled professionals brings unique ideas to life, ensuring every project is creative, high-quality, and stands out in its industry.
                    </p>

                    <div className="pb-8 text-white/90 font-medium space-y-0">
                        <p className=" mb-2">Our Focus:</p>
                        <ul className="space-y-1">
                            <li>• Fast & Reliable Development</li>
                            <li>• Top-Quality Services at Competitive Prices</li>
                            <li>• Professional & Experienced Team</li>
                        </ul>
                    </div>

                    <Link href="/contact-us">
                        <button className="bg-[#262323] text-white px-8 py-4 font-semibold text-[16px] uppercase transition-all duration-300 hover:bg-white hover:text-[#000000]">
                            CONTACT US
                        </button>
                    </Link>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-[400px] ">
                    <Image
                        src={InnovationImage}
                        alt="Innovation and Creativity"
                        fill
                        className="object-contain object-cover py-3 -pl-5"
                    />
                </div>
            </div>
        </div>
    );
};

export default WatchUsLive;
