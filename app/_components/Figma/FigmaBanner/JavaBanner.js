import React from 'react';
import FigmaBg from '@/components/Images/figmabg.png';
import { getCmsVal } from '@/lib/api-helper';

const FigmaBanner = ({ cmsContent }) => {
    const bgImageSrc = FigmaBg?.src || FigmaBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "figmabanner");

    const defaultLine1 = "Figma: Interface Design &";
    const defaultLine2 = "Prototyping Technology";
    const defaultDesc = "Figma is a cloud-based design tool that enables seamless collaboration, interactive prototyping, and modern UI/UX design for web and mobile applications.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "figmabanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "figmabanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "figmabanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-white px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="text-area flex flex-col w-[680px] max-w-full md:absolute left-10 md:left-16 lg:left-24 px-4 z-10">
                <h1 className='text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.18] text-white tracking-tight'>
                    {line1} <br />
                    {line2}
                </h1>
                <p className='text-[14px] sm:text-[15px] leading-[25px] mt-4 text-gray-200 font-normal max-w-[500px]'>
                    {desc}
                </p>
            </div>
            <div className="hidden">
                <h1>Figma: Interface Design &</h1>
                <h1>Prototyping Technology</h1>
                <p>Figma is a cloud-based design tool that enables seamless collaboration, interactive prototyping, and modern UI/UX design for web and mobile applications.</p>
            </div>
        </div>
    );
};

export default FigmaBanner;
