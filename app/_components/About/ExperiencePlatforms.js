import React from "react";
import Image from "next/image";
import Link from "next/link";
import HireUsBanner from "../../../components/Images/aboutbg2.webp";

const ExperiencePlatforms = () => {
    return (
        <div className="relative w-full min-h-[400px] md:min-h-[450px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HireUsBanner}
                    alt="Experience Us"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 "></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[1140px] px-5 text-center text-white">
                <div className="inline-block bg-[#41b349] text-white px-5 py-2  font-semibold text-[17px] mb-8 shadow-lg shadow-[#41b349]/50">
                    Experience us
                </div>

                <h2 className="text-[35px] md:text-[55px] font-bold mb-10 leading-tight max-w-[900px] mx-auto">
                    We Offer & Do More then Ever Platforms.
                </h2>

                <Link href="/services/hire-us">
                    <button className="bg-white text-black px-5 py-4  text-[16px] font-semibold uppercase transition-all duration-300 hover:bg-[#232323] hover:text-white">
                        HIRE US
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ExperiencePlatforms;
