import React from 'react'
import PhpIcon from '../../../../components/Images/phpicon.png'
import Image from 'next/image'
import { getCmsVal } from '@/lib/api-helper'

const PhpFramework = ({ cmsContent }) => {
    const iconSrc = PhpIcon?.src || PhpIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "phpframework");

    const defaultHeading = "Dynamic and Server-Side Scripting Language";
    const defaultParagraph = "PHP (Hypertext Preprocessor) is a popular server-side scripting language widely used for web development. Known for its ease of use, flexibility, and integration with HTML, PHP powers millions of websites and web applications, including content management systems like WordPress, Drupal, and Joomla.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "phpframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "phpframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "phpframework");

    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-[262px] mt-10'>
            <div className="left-image basis-[40%] flex items-center justify-center ">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="PHP Icon" className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                ) : (
                    <Image src={PhpIcon} alt="PHP Icon" width={1000} height={1000} className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                )}
            </div>
            <div className="text-area basis-[60%] flex flex-col justify-between h-full py-5 px-5 gap-6 md:gap-0 md:px-0 md:pr-30">
                <h1 className='text-[20px] font-[700] leading-[24px]'>{heading}</h1>
                <p className='text-[15px] leading-[28px] md:mt-5 text-justify'>{paragraph}</p>
                <button className='text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>Dynamic and Server-Side Scripting Language</h1>
                <p>PHP (Hypertext Preprocessor) is a popular server-side scripting language widely used for web development. Known for its ease of use, flexibility, and integration with HTML, PHP powers millions of websites and web applications, including content management systems like WordPress, Drupal, and Joomla.</p>
                <button>Key Features</button>
            </div>
        </div>
    )
}

export default PhpFramework
