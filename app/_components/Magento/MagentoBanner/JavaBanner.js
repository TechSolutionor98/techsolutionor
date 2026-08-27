import React from 'react';
import MagentoBg from '@/components/Images/magentobg.jpg';
import { getCmsVal } from '@/lib/api-helper';

const MagentoBanner = ({ cmsContent }) => {
    const bgImageSrc = MagentoBg?.src || MagentoBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "magentobanner");

    const defaultLine1 = "Magento: Powerful eCommerce Platform &";
    const defaultLine2 = "Technology for Online Stores";
    const defaultDesc = "Magento is a leading platform for building scalable, secure, and highly customizable online stores, making it the go-to solution for businesses aiming to create dynamic and innovative e-commerce experiences";

    const line1 = getCmsVal(cmsContent, defaultLine1, "magentobanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "magentobanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "magentobanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-white px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            <div className="text-area text-white z-10 w-full max-w-[1000px] px-5 text-center mx-auto flex flex-col items-center justify-center">
                <h1 className='text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold leading-[1.18] text-white tracking-tight'>
                    {line1} <br className="hidden sm:inline" />
                    {line2}
                </h1>
                <p className='text-[14px] sm:text-[16px] md:text-[18px] leading-[28px] md:leading-[32px] mt-5 text-gray-100 font-normal max-w-[950px] mx-auto'>
                    {desc}
                </p>
            </div>
            <div className="hidden">
                <h1>Magento: Powerful eCommerce Platform &</h1>
                <h1>Technology for Online Stores</h1>
                <p>Magento is a leading platform for building scalable, secure, and highly customizable online stores, making it the go-to solution for businesses aiming to create dynamic and innovative e-commerce experiences</p>
            </div>
        </div>
    );
};

export default MagentoBanner;
