import React from "react";
import Image from "next/image";
import BannerDots from "../../../components/Images/webdevbannerdots.png";

const AboutHero = () => {
    return (
        <div className="relative w-full bg-[#262323] overflow-hidden py-10 md:py-10 text-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <Image
                    src={BannerDots}
                    alt="Background Pattern"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 max-w-[1140px] mx-auto px-5">
                <h1 className="text-white text-[40px] md:text-[50px] font-bold uppercase tracking-wide mb-6">
                    ABOUT US
                </h1>
                <p className="text-white text-base md:text-[17] max-w-[805px] mx-auto leading-relaxed">
                    We are a dedicated team of professionals delivering top-notch technology solutions and handyman services <br className="hidden md:block" />
                    tailored to meet your unique needs, helping businesses and individuals achieve success with efficiency and reliability.
                </p>
                <div className="mt-8">
                    <div className="w-[60px] h-[50px] border border-white mx-auto flex items-center justify-center hover:bg-[#41b349] ">
                        <span className="text-white text-[25px]">↓</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;
