import React from "react";
import ManImage from "../../../../../components/Images/appdev.png";
import Image from "next/image";

const TransformingIdeas = () => {
  return (
    <div className="relative overflow-visible bg-white">
      {/* GREEN BANNER SECTION */}
      <div className="relative w-full bg-[#41b349] h-[245px] -mt-2 sm:-mt-4 md:-mt-6 sm:mb-[40px] md:mb-[50px] overflow-visible z-20">
        {/* CONTENT WRAPPER */}
        <div className="relative max-w-[1140px] mx-auto px-5 md:px-10 h-full flex items-center overflow-visible">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 overflow-visible">
            {/* LEFT IMAGE */}
            <div className="relative w-full md:w-1/2 flex justify-center md:justify-start overflow-visible">
              <Image
                src={ManImage}
                alt="App Development"
                width={520}
                height={520}
                className="relative -top-6 sm:-top-7 md:-top-8 max-w-[240px] sm:max-w-[260px] md:max-w-[280px] max-h-[400px] object-contain z-30"
              />
            </div>

            {/* RIGHT TEXT - CENTERED */}
            <div className="relative w-full md:w-1/2 text-white text-center flex justify-center items-center">
              <h1 className="uppercase font-bold leading-tight tracking-wide text-[24px] sm:text-[28px] md:text-[32px] text-center">
                <span className="block">transforming ideas into</span>
                <span className="block">powerful mobile</span>
                <span className="block">applications</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER TEXT SECTION - CLEAN WHITE BACKGROUND & CENTERED */}
      <div className="relative z-10 w-full bg-white py-8 md:py-12 flex justify-center items-center">
        <p className="max-w-[900px] text-sm sm:text-base md:text-[16.5px] text-center text-gray-700 leading-relaxed px-5 mx-auto">
          At Tech Solutionor we specialize in creating innovation and high performance mobile applications tailored to your business needs. Our experienced team of developers is adept at building apps for both IOS and Android platforms, ensuring a seamless and engaging use experience.
        </p>
      </div>
    </div>
  );
};

export default TransformingIdeas;
