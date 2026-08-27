import React from "react";
import Image from "next/image";
import Web2Image from "../../../../../components/Images/web2.png";

const OurProces = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 font-sans relative overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-5">
        
        {/* GREEN HEADER BANNER */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="bg-[#41b349] text-white px-8 sm:px-14  rounded-[12px] shadow-md inline-block">
            <h2 className="text-[22px] sm:text-[30px] md:text-[36px] font-extrabold uppercase tracking-wide text-center">
              OUR DEVELOPMENT PROCESS
            </h2>
          </div>
        </div>

        {/* DESKTOP LAYOUT: CENTER IMAGE WITH LEFT & RIGHT TEXT COLUMNS */}
        <div className="hidden md:flex relative max-w-[980px] mx-auto items-center justify-center py-2 min-h-[560px]">
          
          {/* LEFT COLUMN CONTENT (STEPS 2, 4, 6) - SHIFTED SLIGHTLY DOWNWARD */}
          <div className="w-1/2 flex flex-col justify-between h-[500px] pr-8 text-right z-10">
            {/* STEP 2: PLANNING */}
            <div className="mt-[50px] translate-y-0 transition-transform duration-300">
              <h3 className="text-[#41b349] font-bold text-[18px] lg:text-[20px] uppercase tracking-wide mb-1">
                PLANNING
              </h3>
              <p className="text-gray-600 font-medium text-[13.5px] lg:text-[14.5px] leading-snug">
                <span className="text-black font-bold mr-1">➢</span> Define scope, roadmap &amp; timeline
              </p>
            </div>

            {/* STEP 4: DEVELOPMENT */}
            <div className="mt-[20px] translate-y-3 transition-transform duration-300">
              <h3 className="text-[#41b349] font-bold text-[18px] lg:text-[20px] uppercase tracking-wide mb-1">
                DEVELOPMENT
              </h3>
              <p className="text-gray-600 font-medium text-[13.5px] lg:text-[14.5px] leading-snug">
                <span className="text-black font-bold mr-1">➢</span> Build scalable, secure applications
              </p>
            </div>

            {/* STEP 6: SUPPORT */}
            <div className="-mb-[16px] translate-y-3 transition-transform duration-300">
              <h3 className="text-[#41b349] font-bold text-[18px] lg:text-[20px] uppercase tracking-wide mb-1">
                SUPPORT
              </h3>
              <p className="text-gray-600 font-medium text-[13.5px] lg:text-[14.5px] leading-snug">
                <span className="text-black font-bold mr-1">➢</span> Ongoing maintenance &amp; technical support
              </p>
            </div>
          </div>

          {/* CENTER GRAPHIC IMAGE (web2.png) */}
          <div className="flex-shrink-0 z-0 px-2">
            <Image
              src={Web2Image}
              alt="Development Process Timeline"
              width={320}
              height={600}
              className="w-[230px] lg:w-[260px] h-auto object-contain"
              priority
            />
          </div>

          {/* RIGHT COLUMN CONTENT (STEPS 1, 3, 5) - SHIFTED SLIGHTLY UPWARD */}
          <div className="w-1/2 flex flex-col justify-between h-[500px] pl-8 text-left z-10">
            {/* STEP 1: CONSULTATION */}
            <div className="-mt-[22px] -translate-y-6 transition-transform duration-300">
              <h3 className="text-[#41b349] font-bold text-[18px] lg:text-[20px] uppercase tracking-wide mb-1">
                CONSULTATION
              </h3>
              <p className="text-gray-600 font-medium text-[13.5px] lg:text-[14.5px] leading-snug">
                <span className="text-black font-bold mr-1">➢</span> Understand goals &amp; define app strategy
              </p>
            </div>

            {/* STEP 3: DESIGN */}
            <div className="-mt-[6px] -translate-y-6 transition-transform duration-300">
              <h3 className="text-[#41b349] font-bold text-[18px] lg:text-[20px] uppercase tracking-wide mb-1">
                DESIGN
              </h3>
              <p className="text-gray-600 font-medium text-[13.5px] lg:text-[14.5px] leading-snug">
                <span className="text-black font-bold mr-1">➢</span> Create intuitive UI/UX prototypes
              </p>
            </div>

            {/* STEP 5: TESTING */}
            <div className="mb-[68px] -translate-y-3 transition-transform duration-300">
              <h3 className="text-[#41b349] font-bold text-[18px] lg:text-[20px] uppercase tracking-wide mb-1">
                TESTING
              </h3>
              <p className="text-gray-600 font-medium text-[13.5px] lg:text-[14.5px] leading-snug">
                <span className="text-black font-bold mr-1">➢</span> Ensure quality, performance &amp; stability
              </p>
            </div>
          </div>

        </div>

        {/* MOBILE STACKED VIEW */}
        <div className="block md:hidden flex flex-col gap-6 px-4">
          <div className="w-full flex justify-center mb-4">
            <Image
              src={Web2Image}
              alt="Development Process Timeline"
              width={260}
              height={450}
              className="w-[200px] h-auto object-contain"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#41b349] font-bold text-[17px] uppercase mb-1">1. CONSULTATION</h3>
              <p className="text-gray-600 text-[13.5px]">➢ Understand goals &amp; define app strategy</p>
            </div>
            <div>
              <h3 className="text-[#41b349] font-bold text-[17px] uppercase mb-1">2. PLANNING</h3>
              <p className="text-gray-600 text-[13.5px]">➢ Define scope, roadmap &amp; timeline</p>
            </div>
            <div>
              <h3 className="text-[#41b349] font-bold text-[17px] uppercase mb-1">3. DESIGN</h3>
              <p className="text-gray-600 text-[13.5px]">➢ Create intuitive UI/UX prototypes</p>
            </div>
            <div>
              <h3 className="text-[#41b349] font-bold text-[17px] uppercase mb-1">4. DEVELOPMENT</h3>
              <p className="text-gray-600 text-[13.5px]">➢ Build scalable, secure applications</p>
            </div>
            <div>
              <h3 className="text-[#41b349] font-bold text-[17px] uppercase mb-1">5. TESTING</h3>
              <p className="text-gray-600 text-[13.5px]">➢ Ensure quality, performance &amp; stability</p>
            </div>
            <div>
              <h3 className="text-[#41b349] font-bold text-[17px] uppercase mb-1">6. SUPPORT</h3>
              <p className="text-gray-600 text-[13.5px]">➢ Ongoing maintenance &amp; technical support</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurProces;
