import React from 'react';
import JavaBg from '../../../../components/Images/swiftbg.jpg';
import { getCmsVal } from '@/lib/api-helper';

const SwiftBanner = ({ cmsContent }) => {
    const bgImageSrc = JavaBg?.src || JavaBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "swiftbanner");

    const defaultLine1 = "Swift: Modern Programming Language";
    const defaultLine2 = "for App & Software";
    const defaultLine3 = "Development";
    const defaultDesc = "Swift is a powerful programming language developed by Apple, designed for building fast, safe, and efficient iOS, macOS, and watchOS applications, offering a seamless coding experience with modern syntax.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "swiftbanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "swiftbanner");
    const line3 = getCmsVal(cmsContent, defaultLine3, "swiftbanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "swiftbanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-white px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
            }}
        >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="text-area text-white z-10 w-[680px] max-w-full md:absolute left-10 md:left-16 lg:left-24 px-4">
                <h1 className='text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[800] leading-[1.2] text-[#41b349] tracking-tight'>
                    {line1} <br />
                    {line2} <br />
                    {line3}
                </h1>
                <p className='text-[14px] sm:text-[15px] leading-[25px] mt-4 text-gray-200 font-normal max-w-[540px]'>
                    {desc}
                </p>
            </div>
            <div className="hidden">
                <h1>Swift: Modern Programming Language</h1>
                <h1>for App & Software</h1>
                <h1>Development</h1>
                <p>Swift is a powerful programming language developed by Apple, designed for building fast, safe, and efficient iOS, macOS, and watchOS applications, offering a seamless coding experience with modern syntax.</p>
            </div>
        </div>
    );
};

export default SwiftBanner;
