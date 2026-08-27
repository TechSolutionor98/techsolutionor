import React from 'react';
import GoogleAdsBg from '@/components/Images/googleadsbg.png';
import { getCmsVal } from '@/lib/api-helper';

const GoogleBanner = ({ cmsContent }) => {
    const bgImageSrc = GoogleAdsBg?.src || GoogleAdsBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "googlebanner");

    const defaultLine1 = "Google Ads:";
    const defaultLine2 = "Digital Advertising";
    const defaultLine3 = "platform for Business Growth";
    const defaultDesc = "Google Ads is a powerful online advertising platform that helps businesses reach their target audience, drive traffic, and increase conversions. Our solutions focus on data-driven campaigns that maximize ROI and business growth.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "googlebanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "googlebanner");
    const line3 = getCmsVal(cmsContent, defaultLine3, "googlebanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "googlebanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-slate-800 px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#e8f4f2'
            }}
        >
            <div className="text-area flex flex-col w-[680px] max-w-full md:absolute left-10 md:left-16 lg:left-24 px-4 z-10">
                <h1 className='text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.18] text-[#34a853] tracking-tight'>
                    {line1} <br />
                    {line2} <br />
                    {line3}
                </h1>
                <p className='text-[14px] sm:text-[15px] leading-[25px] mt-4 text-[#4b5563] font-normal max-w-[500px]'>
                    {desc}
                </p>
            </div>
            <div className="hidden">
                <h1>Google Ads:</h1>
                <h1>Digital Advertising</h1>
                <h1>platform for Business Growth</h1>
                <p>Google Ads is a powerful online advertising platform that helps businesses reach their target audience, drive traffic, and increase conversions. Our solutions focus on data-driven campaigns that maximize ROI and business growth.</p>
            </div>
        </div>
    );
};

export default GoogleBanner;
