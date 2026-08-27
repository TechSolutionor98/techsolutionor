import React from 'react'
import CssIcon from '../../../../components/Images/cssicon.png'
import Image from 'next/image'
import { getCmsVal } from '@/lib/api-helper'

const CssFramework = ({ cmsContent }) => {
    const iconSrc = CssIcon?.src || CssIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "cssframework");

    const defaultHeading = "Designing Beautiful and Responsive Websites";
    const defaultParagraph = "CSS is the backbone of modern web design, empowering developers to craft responsive and visually stunning websites that deliver seamless experiences across all devices. It plays a pivotal role in managing layout, typography, color schemes, and the overall look and feel of a website, elevating user interactions and engagement.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "cssframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "cssframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "cssframework");

    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-[262px] mt-10'>
            <div className="left-image basis-[40%] flex items-center justify-center ">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="CSS Icon" className='w-[200px] h-[200px] md:w-[262px] md:h-[232px] object-contain'/>
                ) : (
                    <Image src={CssIcon} alt="CSS Icon" width={1000} height={1000} className='w-[200px] h-[200px] md:w-[262px] md:h-[232px] object-contain'/>
                )}
            </div>
            <div className="text-area basis-[60%] flex flex-col justify-between h-full py-5 px-5 gap-6 md:gap-0 md:px-0 md:pr-30">
                <h1 className='text-[20px] font-[700] leading-[24px]'>{heading}</h1>
                <p className='text-[15px] leading-[28px] md:mt-5 text-justify'>{paragraph}</p>
                <button className='text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>Designing Beautiful and Responsive Websites</h1>
                <p>CSS is the backbone of modern web design, empowering developers to craft responsive and visually stunning websites that deliver seamless experiences across all devices. It plays a pivotal role in managing layout, typography, color schemes, and the overall look and feel of a website, elevating user interactions and engagement.</p>
                <button>Key Features</button>
            </div>
        </div>
    )
}

export default CssFramework
