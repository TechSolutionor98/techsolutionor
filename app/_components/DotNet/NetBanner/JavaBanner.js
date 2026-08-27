import React from 'react';
import DotNetBg from '@/components/Images/dotnetbg2.jpg';
import { getCmsVal } from '@/lib/api-helper';

const Netanner = ({ cmsContent }) => {
    const bgImageSrc = DotNetBg?.src || DotNetBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "netanner");

    const defaultLine1 = ".NET: Modern Technology";
    const defaultLine2 = "for Building Scalable Web";
    const defaultLine3 = "& Mobile Apps";
    const defaultDesc = ".NET is a versatile, high-performance framework by Microsoft that empowers businesses to build secure, scalable, and future-ready applications. From enterprise-grade software to cross-platform apps, .NET enables developers to create robust solutions with faster deployment, seamless integration, and long-term maintainability.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "netanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "netanner");
    const line3 = getCmsVal(cmsContent, defaultLine3, "netanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "netanner");

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
                <h1>.NET: Modern Technology</h1>
                <h1>for Building Scalable Web</h1>
                <h1>& Mobile Apps</h1>
                <p>.NET is a versatile, high-performance framework by Microsoft that empowers businesses to build secure, scalable, and future-ready applications. From enterprise-grade software to cross-platform apps, .NET enables developers to create robust solutions with faster deployment, seamless integration, and long-term maintainability.</p>
            </div>
        </div>
    );
};

export default Netanner;
