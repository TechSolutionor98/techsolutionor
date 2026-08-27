import React from 'react';
import WpBg from '@/components/Images/wordpressbg.jpg';
import { getCmsVal } from '@/lib/api-helper';

const WpBanner = ({ cmsContent }) => {
  const bgImageSrc = WpBg?.src || WpBg;
  const bgImage = getCmsVal(cmsContent, bgImageSrc, "wpbanner");

  const defaultLine1 = "WordPress: Leading";
  const defaultLine2 = "Technology for Modern";
  const defaultLine3 = "Websites & CMS";
  const defaultLine4 = "Solutions";
  const defaultDesc = "WordPress is the leading content management system, offering unparalleled flexibility and ease of use. It’s the perfect choice for creating dynamic websites, from personal blogs to enterprise-level platforms.";

  const line1 = getCmsVal(cmsContent, defaultLine1, "wpbanner");
  const line2 = getCmsVal(cmsContent, defaultLine2, "wpbanner");
  const line3 = getCmsVal(cmsContent, defaultLine3, "wpbanner");
  const line4 = getCmsVal(cmsContent, defaultLine4, "wpbanner");
  const desc = getCmsVal(cmsContent, defaultDesc, "wpbanner");

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
        <h1 className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.18] text-white tracking-tight">
          {line1} <br />
          {line2} <br />
          {line3} <br />
          {line4}
        </h1>
        <p className="text-[14px] sm:text-[15px] leading-[25px] mt-4 text-gray-200 font-normal max-w-[500px]">
          {desc}
        </p>
      </div>
      <div className="hidden">
        <h1>WordPress: Leading</h1>
        <h1>Technology for Modern</h1>
        <h1>Websites & CMS</h1>
        <h1>Solutions</h1>
        <p>WordPress is the leading content management system, offering unparalleled flexibility and ease of use. It’s the perfect choice for creating dynamic websites, from personal blogs to enterprise-level platforms.</p>
      </div>
    </div>
  );
};

export default WpBanner;
