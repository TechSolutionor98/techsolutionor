import React from "react";
import PythonBg from "@/components/Images/pythonbg.jpg";
import { getCmsVal } from "@/lib/api-helper";

const PythonBanner = ({ cmsContent }) => {
  const bgImageSrc = PythonBg?.src || PythonBg;
  const bgImage = getCmsVal(cmsContent, bgImageSrc, "pythonbanner");

  const line1 = getCmsVal(cmsContent, "Python: Modern Programming", "pythonbanner");
  const line2 = getCmsVal(cmsContent, "for Web and App", "pythonbanner");
  const line3 = getCmsVal(cmsContent, "Development", "pythonbanner");
  const desc = getCmsVal(
    cmsContent,
    "Python is a versatile, high-performance programming language used to build modern web applications, software, and scalable solutions efficiently and reliably.",
    "pythonbanner"
  );

  return (
    <div
      className="w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-white px-5 md:px-0"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-area flex flex-col w-[680px] max-w-full md:absolute left-10 md:left-16 lg:left-24 px-4 z-10">
        <h1 className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.2] text-white tracking-tight">
          {line1} <br />
          {line2} <br />
          {line3}
        </h1>
        <p className="text-[14px] sm:text-[15px] leading-[24px] mt-4 text-gray-200 font-normal max-w-[500px]">
          {desc}
        </p>
      </div>
      <div className="hidden">
        <h1>Python: Modern Programming</h1>
        <h1>for Web and App</h1>
        <h1>Development</h1>
        <p>Python is a versatile, high-performance programming language used to build modern web applications, software, and scalable solutions efficiently and reliably.</p>
      </div>
    </div>
  );
};

export default PythonBanner;
