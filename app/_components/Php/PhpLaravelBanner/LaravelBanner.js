import React from 'react';
import Php2Bg from '@/components/Images/php2.jpeg';
import { getCmsVal } from '@/lib/api-helper';

const PhpBanner = ({ cmsContent }) => {
  const bgImageSrc = Php2Bg?.src || Php2Bg;
  const bgImage = getCmsVal(cmsContent, bgImageSrc, "phpbanner");

  const defaultLine1 = "PHP: Powefull technology";
  const defaultLine2 = "for Dynamic & Scalable Web";
  const defaultLine3 = "Applications";
  const defaultDesc = "PHP is a powerful server-side scripting language used to build dynamic websites and applications, offering flexibility, scalability, and seamless database integration for robust web solutions.";

  const line1 = getCmsVal(cmsContent, defaultLine1, "phpbanner");
  const line2 = getCmsVal(cmsContent, defaultLine2, "phpbanner");
  const line3 = getCmsVal(cmsContent, defaultLine3, "phpbanner");
  const desc = getCmsVal(cmsContent, defaultDesc, "phpbanner");

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
          {line3}
        </h1>
        <p className="text-[14px] sm:text-[15px] leading-[25px] mt-4 text-gray-200 font-normal max-w-[500px]">
          {desc}
        </p>
      </div>
      <div className="hidden">
        <h1>PHP: Powefull technology</h1>
        <h1>for Dynamic & Scalable Web</h1>
        <h1>Applications</h1>
        <p>PHP is a powerful server-side scripting language used to build dynamic websites and applications, offering flexibility, scalability, and seamless database integration for robust web solutions.</p>
      </div>
    </div>
  );
};

export default PhpBanner;
