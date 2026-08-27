import React from "react";
import ReactBg from "@/components/Images/reactbg.jpg";

const ReactBanner = () => {
  return (
    <div
      className="w-full h-[50vh] md:h-[100vh] relative flex items-center justify-center text-white px-5 md:px-0"
      style={{
        backgroundImage: `url(${ReactBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-area flex flex-col w-[640px] max-w-full md:absolute left-14 md:left-20 lg:left-24 px-4">
        <h1 className="text-[34px] sm:text-[44px] md:text-[52px] lg:text-[56px] font-bold leading-[1.08] text-[#41b349] tracking-tight">
          ReactJS: Technology for <br className="hidden md:block" />
          Dynamic &amp; Interactive <br className="hidden md:block" />
          Web Interfaces
        </h1>
        <p className="text-[15px] sm:text-[16px] leading-[26px] mt-6 text-[#bed9da] font-normal max-w-[540px]">
          React is a popular JavaScript library for creating fast, interactive, and reusable user interfaces, making it a top choice for modern web development.
        </p>
      </div>
    </div>
  );
};

export default ReactBanner;
