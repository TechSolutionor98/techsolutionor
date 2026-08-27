import React from "react";
import Image from "next/image";
import AdsServices from "../../../../../components/Images/ppcads.png"; // This looks like the one with "Paid Search"

function PPCFramework() {
    return (
        <section className="bg-white py-20 px-6 font-sans">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-24">

                {/* Left Illustration */}
                <div className="flex justify-center md:justify-start">
                    <div className="relative w-full max-w-[580px]">
                        <Image
                            src={AdsServices}
                            alt="Paid Search Marketing Services Illustration"
                            layout="responsive"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Right Text Content */}
                <div className="text-center md:text-left">
                    {/* Tag */}
                    <div className="inline-block bg-[#262323] text-white px-6 py-2 rounded-sm mb-6 shadow-[4px_4px_0px_#41B349]">
                        <span className="text-sm font-bold uppercase tracking-widest">
                            What We Do
                        </span>
                    </div>

                    <h2 className="text-[32px] sm:text-[40px] font-bold text-[#262323] leading-tight mb-8">
                        Driving success through strategic <br className="hidden lg:block" />
                        paid search advertising!
                    </h2>

                    <p className="text-gray-600 text-lg md:text-[18px] leading-relaxed mb-6">
                        At Tech Solutionor, transforming your brand’s online presence and
                        generating measurable results is our top priority. As a leading PPC
                        and Amazon Ads agency in Dubai and UAE, we design data-driven
                        campaigns that maximize ROI, increase conversions, and grow your
                        business locally and globally.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default PPCFramework;
