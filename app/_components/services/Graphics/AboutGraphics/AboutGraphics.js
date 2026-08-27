import React from "react";
import Graphics from "../../../../../components/Images/graphics1.jpg";
import Image from "next/image";

const AboutGraphics = () => {
  return (
    <div>
      <div className="relative w-full bg-white mt-5 md:-mt-15  flex justify-center items-center">
        <div className=" max-w-[1140px] mx-auto px-6 md:px-5  py-10 md:py-5 flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-full md:w-1/2 md:-mt-15 ml-4  flex flex-col gap-5 md:gap-6">
            <span
              className="uppercase text-white md:w-[80px] bg-black px-0 py-2 text-center
              shadow-[0_5px_8px_0_#41B349]"
            >
              About Us
            </span>
            <h2 className="uppercase  text-[20px]  md:text-[40px] font-[700]  font-[sans-serif] leading-tight">
              Designed to enhance your presentations
            </h2>

            <p className="text-[15px] text-justify max-w-[800px]">
              While we always seek out the best talent in our industry, a good
              cultural fit is always an absolute must.
            </p>
            <ul className="list-disc pl-5 ">
              <li>Qualityful Work</li>
              <li>Moneyback Guarentee</li>
            </ul>
          </div>
          <div className="md:flex w-full md:w-1/2 mt-[43px] flex md:relative md:mb-20 justify-center md:justify-end relative md:right-[0px]">
            <Image
              src={Graphics}
              alt="Mobile App Services"
              width={200}
              height={200}
              className="w-full max-w-[600px] object-contain"
            />
          </div>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6 items-center justify-center text-justify md:flex-row">
        {/* Div 1 */}
        <div className="flex-1 px-6 border-r border-black">
          <h2 className="text-[24px] md:text-[28px] font-[600] mb-2">
            Our <span className="text-[#41b349]">Value</span>
          </h2>
          <p className="text-sm text-gray-700">
            Our graphic design services deliver innovative, high-quality visuals
            tailored to your brand through close collaboration.
          </p>
        </div>

        {/* Div 2 */}
        <div className="flex-1 px-6 border-r  border-black">
          <h3 className="text-[24px] md:text-[28px] font-[600] mb-2">
            OUR <span className="text-[#41b349]">Mission</span>
          </h3>
          <p className="text-sm text-gray-700">
            To transform your ideas into impactful visual experiences through
            innovative design, exceptional quality, dedicated collaboration.
          </p>
        </div>

        {/* Div 3 */}
        <div className="flex-1 border-r border-black px-6">
          <h3 className="text-[24px] md:text-[28px] font-[600] mb-2">
            OUR <span className="text-[#41b349]">Vision</span>
          </h3>
          <p className="text-sm text-gray-700">
            To be the leading provider of innovative graphic design solutions,
            empowering brands through exceptional visual storytelling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutGraphics;
