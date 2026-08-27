import React from 'react'
import WpIcon from '../../../../components/Images/wpicon.png'
import Image from 'next/image'
import { getCmsVal } from '@/lib/api-helper'

const WpFramework = ({ cmsContent }) => {
    const iconSrc = WpIcon?.src || WpIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "wpframework");

    const defaultHeading = "The Leading Content Management System";
    const defaultParagraph = "WordPress is the world’s most popular content management system (CMS), powering over 40% of all websites. Known for its flexibility, ease of use, and extensive plugin ecosystem, WordPress is the go-to platform for creating everything from blogs and portfolios to e-commerce stores and enterprise websites.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "wpframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "wpframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "wpframework");

    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-[262px] mt-10'>
            <div className="left-image basis-[40%] flex items-center justify-center ">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="WordPress Icon" className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                ) : (
                    <Image src={WpIcon} alt="WordPress Icon" width={1000} height={1000} className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                )}
            </div>
            <div className="text-area basis-[60%] flex flex-col justify-between h-full py-5 px-5 gap-6 md:gap-0 md:px-0 md:pr-30">
                <h1 className='text-[20px] font-[700] leading-[24px]'>{heading}</h1>
                <p className='text-[15px] leading-[28px] md:mt-5 text-justify'>{paragraph}</p>
                <button className='text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>The Leading Content Management System</h1>
                <p>WordPress is the world’s most popular content management system (CMS), powering over 40% of all websites. Known for its flexibility, ease of use, and extensive plugin ecosystem, WordPress is the go-to platform for creating everything from blogs and portfolios to e-commerce stores and enterprise websites.</p>
                <button>Key Features</button>
            </div>
        </div>
    )
}

export default WpFramework
