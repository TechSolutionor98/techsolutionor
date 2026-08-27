import React from 'react';
import Html2Bg from '@/components/Images/html2bg.jpeg';
import { getCmsVal } from '@/lib/api-helper';

const HTMLBanner = ({ cmsContent }) => {
  const bgImageSrc = Html2Bg?.src || Html2Bg;
  const bgImage = getCmsVal(cmsContent, bgImageSrc, "htmlbanner");

  const defaultLine1 = "HTML: Core Web Markup";
  const defaultLine2 = "language for Modern Web";
  const defaultLine3 = "Development";
  const defaultDesc = "HTML is the foundation of every website, enabling structured, accessible, and responsive web pages. It works seamlessly with CSS and JavaScript to create modern, user-friendly web experiences.";

  const line1 = getCmsVal(cmsContent, defaultLine1, "htmlbanner");
  const line2 = getCmsVal(cmsContent, defaultLine2, "htmlbanner");
  const line3 = getCmsVal(cmsContent, defaultLine3, "htmlbanner");
  const desc = getCmsVal(cmsContent, defaultDesc, "htmlbanner");

  return (
    <div
      className="w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center px-5 md:px-0"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-area flex flex-col w-[680px] max-w-full md:absolute left-10 md:left-16 lg:left-24 px-4 z-10">
        <h1 className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.18] text-[#1f1f1f] tracking-tight">
          {line1} <br />
          {line2} <br />
          {line3}
        </h1>
        <p className="text-[14px] sm:text-[15px] leading-[25px] mt-4 text-[#555555] font-normal max-w-[500px]">
          {desc}
        </p>
      </div>
      <div className="hidden">
        <h1>HTML: Core Web Markup</h1>
        <h1>language for Modern Web</h1>
        <h1>Development</h1>
        <p>HTML is the foundation of every website, enabling structured, accessible, and responsive web pages. It works seamlessly with CSS and JavaScript to create modern, user-friendly web experiences.</p>
      </div>
    </div>
  );
};

export default HTMLBanner;
