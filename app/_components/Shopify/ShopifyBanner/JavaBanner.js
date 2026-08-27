import React from 'react';
import ShopifyBg from '@/components/Images/shopifybg.avif';
import { getCmsVal } from '@/lib/api-helper';

const ShopifyBanner = ({ cmsContent }) => {
    const bgImageSrc = ShopifyBg?.src || ShopifyBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "shopifybanner");

    const defaultLine1 = "Shopify: Leading";
    const defaultLine2 = "eCommerce Technology";
    const defaultLine3 = "for Online Stores";
    const defaultDesc = "Shopify is a versatile e-commerce platform designed to help businesses build, customize, and scale their online stores. With its user-friendly interface and extensive features, Shopify makes it easy to manage products, process payments, and grow your brand globally.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "shopifybanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "shopifybanner");
    const line3 = getCmsVal(cmsContent, defaultLine3, "shopifybanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "shopifybanner");

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
                <h1>Shopify: Leading</h1>
                <h1>eCommerce Technology</h1>
                <h1>for Online Stores</h1>
                <p>Shopify is a versatile e-commerce platform designed to help businesses build, customize, and scale their online stores. With its user-friendly interface and extensive features, Shopify makes it easy to manage products, process payments, and grow your brand globally.</p>
            </div>
        </div>
    );
};

export default ShopifyBanner;
