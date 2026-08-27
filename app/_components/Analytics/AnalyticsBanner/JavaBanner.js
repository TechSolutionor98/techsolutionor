import React from 'react';
import AnalyticBannerBg from '@/components/Images/GoogleAnalytics-BANNER.jpg';
import { getCmsVal } from '@/lib/api-helper';

const AnalyticsBanner = ({ cmsContent }) => {
    const bgImageSrc = AnalyticBannerBg?.src || AnalyticBannerBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "analyticsbanner");

    const defaultLine1 = "Analytics: Data-Driven";
    const defaultLine2 = "Technology for Business";
    const defaultLine3 = "Insights";
    const defaultDesc = "Analytics technology helps businesses turn data into actionable insights, optimize performance, and make data-driven decisions. Our solutions empower organizations to leverage web, business, and operational data for smarter growth and better results.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "analyticsbanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "analyticsbanner");
    const line3 = getCmsVal(cmsContent, defaultLine3, "analyticsbanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "analyticsbanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-slate-800 px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="text-area flex flex-col w-[680px] max-w-full md:absolute left-10 md:left-16 lg:left-24 px-4 z-10">
                <h1 className='text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.18] text-[#d87c2b] tracking-tight'>
                    {line1} <br />
                    {line2} <br />
                    {line3}
                </h1>
                <p className='text-[14px] sm:text-[15px] leading-[25px] mt-4 text-[#4b5563] font-normal max-w-[500px]'>
                    {desc}
                </p>
            </div>
            <div className="hidden">
                <h1>Analytics: Data-Driven</h1>
                <h1>Technology for Business</h1>
                <h1>Insights</h1>
                <p>Analytics technology helps businesses turn data into actionable insights, optimize performance, and make data-driven decisions. Our solutions empower organizations to leverage web, business, and operational data for smarter growth and better results.</p>
            </div>
        </div>
    );
};

export default AnalyticsBanner;
