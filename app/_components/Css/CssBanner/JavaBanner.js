import React from 'react';
import CssBg from '@/components/Images/cssbg.avif';
import { getCmsVal } from '@/lib/api-helper';

const CssBanner = ({ cmsContent }) => {
    const bgImageSrc = CssBg?.src || CssBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "cssbanner");

    const defaultLine1 = "CSS: Styling Technology for";
    const defaultLine2 = "Modern Web Design &";
    const defaultLine3 = "Layouts";
    const defaultDesc = "CSS (Cascading Style Sheets) is the foundation of modern web design, allowing developers to create visually stunning, fully responsive, and user-friendly websites across all devices.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "cssbanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "cssbanner");
    const line3 = getCmsVal(cmsContent, defaultLine3, "cssbanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "cssbanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-white px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="text-area flex flex-col w-[680px] max-w-full md:absolute left-10 md:left-16 lg:left-24 px-4 z-10">
                <h1 className='text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.18] text-white tracking-tight'>
                    {line1} <br />
                    {line2} <br />
                    {line3}
                </h1>
                <p className='text-[14px] sm:text-[15px] leading-[25px] mt-4 text-gray-200 font-normal max-w-[500px]'>
                    {desc}
                </p>
            </div>
            <div className="hidden">
                <h1>CSS: Styling Technology for</h1>
                <h1>Modern Web Design &</h1>
                <h1>Layouts</h1>
                <p>CSS (Cascading Style Sheets) is the foundation of modern web design, allowing developers to create visually stunning, fully responsive, and user-friendly websites across all devices.</p>
            </div>
        </div>
    );
};

export default CssBanner;
