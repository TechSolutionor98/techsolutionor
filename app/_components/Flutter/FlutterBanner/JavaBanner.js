import React from 'react';
import FlutterBg from '@/components/Images/flutterbg.jpg';
import { getCmsVal } from '@/lib/api-helper';

const FlutterBanner = ({ cmsContent }) => {
    const bgImageSrc = FlutterBg?.src || FlutterBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "flutterbanner");

    const defaultLine1 = "Flutter: Cross-Platform";
    const defaultLine2 = "Mobile App Development";
    const defaultLine3 = "Technology";
    const defaultDesc = "Flutter is a powerful cross-platform framework for building high-performance mobile apps that run seamlessly on iOS and Android, combining fast development with a smooth user experience.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "flutterbanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "flutterbanner");
    const line3 = getCmsVal(cmsContent, defaultLine3, "flutterbanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "flutterbanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-white px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
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
                <h1>Flutter: Cross-Platform</h1>
                <h1>Mobile App Development</h1>
                <h1>Technology</h1>
                <p>Flutter is a powerful cross-platform framework for building high-performance mobile apps that run seamlessly on iOS and Android, combining fast development with a smooth user experience.</p>
            </div>
        </div>
    );
};

export default FlutterBanner;
