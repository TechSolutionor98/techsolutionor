import React from 'react'
import ShopifyIcon from '../../../../components/Images/shopifyicon.png'
import Image from 'next/image'
import { getCmsVal } from '@/lib/api-helper'

const ShopifyFramework = ({ cmsContent }) => {
    const iconSrc = ShopifyIcon?.src || ShopifyIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "shopifyframework");

    const defaultHeading = "Your Complete E-Commerce Solution";
    const defaultParagraph = "Shopify is a leading e-commerce platform that empowers businesses of all sizes to create and manage their online stores with ease. Known for its flexibility and scalability, Shopify offers a comprehensive suite of tools to help you build, customize, and grow your online business.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "shopifyframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "shopifyframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "shopifyframework");

    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-[262px] mt-10'>
            <div className="left-image basis-[40%] flex items-center justify-center ">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="Shopify Icon" className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                ) : (
                    <Image src={ShopifyIcon} alt="Shopify Icon" width={1000} height={1000} className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                )}
            </div>
            <div className="text-area basis-[60%] flex flex-col justify-between h-full py-5 px-5 gap-6 md:gap-0 md:px-0 md:pr-30">
                <h1 className='text-[20px] font-[700] leading-[24px]'>{heading}</h1>
                <p className='text-[15px] leading-[28px] md:mt-5 text-justify'>{paragraph}</p>
                <button className='text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>Your Complete E-Commerce Solution</h1>
                <p>Shopify is a leading e-commerce platform that empowers businesses of all sizes to create and manage their online stores with ease. Known for its flexibility and scalability, Shopify offers a comprehensive suite of tools to help you build, customize, and grow your online business.</p>
                <button>Key Features</button>
            </div>
        </div>
    )
}

export default ShopifyFramework
