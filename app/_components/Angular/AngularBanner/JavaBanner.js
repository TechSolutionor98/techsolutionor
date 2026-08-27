import React from 'react';
import AngularBg from '@/components/Images/angularbg.jpg';
import { getCmsVal } from '@/lib/api-helper';

const AngularBanner = ({ cmsContent }) => {
    const bgImageSrc = AngularBg?.src || AngularBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "angularbanner");

    const defaultLine1 = "Angular: Modern Framework";
    const defaultLine2 = "for Web Application";
    const defaultLine3 = "Development";
    const defaultDesc = "Angular is a powerful framework for building modern web applications with scalable architecture, dynamic interfaces, and efficient performance. Our Angular solutions help businesses deliver responsive, high-quality web experiences.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "angularbanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "angularbanner");
    const line3 = getCmsVal(cmsContent, defaultLine3, "angularbanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "angularbanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-white px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#A6120E'
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
                <h1>Angular: Modern Framework</h1>
                <h1>for Web Application</h1>
                <h1>Development</h1>
                <p>Angular is a powerful framework for building modern web applications with scalable architecture, dynamic interfaces, and efficient performance. Our Angular solutions help businesses deliver responsive, high-quality web experiences.</p>
            </div>
        </div>
    );
};

export default AngularBanner;
