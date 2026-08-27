// app/components/TaglineSection.js
import React from "react";
import Image from "next/image";
import LeftImg from "../../../../../components/Images/digtialabout1.png";
import RightImg from "../../../../../components/Images/digitalabout2.png";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
function Framework() {
  return (
    <section className={`${montserrat.className} relative pt-5 overflow-hidden`}>
      {/* GREEN SHADOW */}
      
      <div className=" relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12">
          {/* LEFT IMAGE */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] md:-translate-y-10">
              <Image
                src={LeftImg}
                alt="Left Image"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="text-center md:text-left px-6 sm:px-6 lg:px-0 md:mx-0">
            {/* Top Badge / Tag */}
            <span
              className="inline-block text-white bg-black px-3 -sm:mr-3  py-4 mb-4  text-[19px] lg:w-[461px] lg:mb-18
             shadow-[0_5px_8px_0_#41B349] rounded -ml-10"
            >
              Build A Successful Brand With TechSolutionor
            </span>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-xl lg:text-[30px] text-center font-bold leading-snug mb-10">
              Comprehensive Digital Marketing Solutions
            </h2>

            {/* Paragraph */}
            <p className="font-man text-sm sm:text-base md:text-lg leading-relaxed max-w-[500px] text-center text-[rgb(38,35,35)]">
              Unlock your business’s full potential with our end-to-end digital
              marketing solutions, tailored to deliver measurable results,
              increased visibility, and sustainable growth for businesses in the
              UAE and worldwide.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] md:translate-y-15 ">
              <Image
                src={RightImg}
                alt="Right Image"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Framework;
