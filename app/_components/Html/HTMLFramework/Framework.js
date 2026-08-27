import React from 'react'
import HtmlIcon from '../../../../components/Images/htmlicon.png'
import Image from 'next/image'
import { getCmsVal } from '@/lib/api-helper'

const HtmlFramework = ({ cmsContent }) => {
    const iconSrc = HtmlIcon?.src || HtmlIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "htmlframework");

    const defaultHeading = "The Backbone of the Web";
    const defaultParagraph = "HTML (HyperText Markup Language) is the standard language for creating and structuring content on the web. It forms the backbone of every website and web application, providing the essential structure and foundation upon which CSS and JavaScript can build dynamic, interactive experiences.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "htmlframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "htmlframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "htmlframework");

    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-[262px] mt-10'>
            <div className="left-image basis-[40%] flex items-center justify-center ">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="HTML Icon" className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                ) : (
                    <Image src={HtmlIcon} alt="HTML Icon" width={1000} height={1000} className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                )}
            </div>
            <div className="text-area basis-[60%] flex flex-col justify-between h-full py-5 px-5 gap-6 md:gap-0 md:px-0 md:pr-30">
                <h1 className='text-[20px] font-[700] leading-[24px]'>{heading}</h1>
                <p className='text-[15px] leading-[28px] md:mt-5 text-justify'>{paragraph}</p>
                <button className='text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>The Backbone of the Web</h1>
                <p>HTML (HyperText Markup Language) is the standard language for creating and structuring content on the web. It forms the backbone of every website and web application, providing the essential structure and foundation upon which CSS and JavaScript can build dynamic, interactive experiences.</p>
                <button>Key Features</button>
            </div>
        </div>
    )
}

export default HtmlFramework
