import React from 'react'
import SwiftIcon from '../../../../components/Images/swift.webp'
import Image from 'next/image'
import { getCmsVal } from '@/lib/api-helper'

const SwiftFramework = ({ cmsContent }) => {
    const iconSrc = SwiftIcon?.src || SwiftIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "swiftframework");

    const defaultHeading = "Empowering iOS App Development";
    const defaultParagraph = "Swift is Apple’s powerful and intuitive programming language designed for building apps across iOS, macOS, watchOS, and tvOS. Introduced in 2014, Swift combines performance, safety, and modern syntax, making it the preferred choice for developers who want to create high-quality, efficient, and secure Apple applications.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "swiftframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "swiftframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "swiftframework");

    return (
        <section className='w-full bg-white py-8 md:py-10 px-5 md:px-12'>
            <div className='max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10'>
                <div className="left-image w-full md:w-[35%] flex items-center justify-center">
                    {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                        <img src={logoUrl} alt="Swift Icon" className='w-[190px] h-[190px] md:w-[230px] md:h-[230px] object-contain'/>
                    ) : (
                        <Image src={SwiftIcon} alt="Swift Icon" width={1000} height={1000} className='w-[190px] h-[190px] md:w-[230px] md:h-[230px] object-contain'/>
                    )}
                </div>
                <div className="text-area w-full md:w-[65%] flex flex-col items-start justify-start md:pr-10">
                    <h1 className='text-[20px] md:text-[22px] font-[700] leading-[26px] text-[#1f1f1f]'>{heading}</h1>
                    <p className='text-[14.5px] md:text-[15px] leading-[26px] md:leading-[27px] mt-4 text-[#333333] text-left'>{paragraph}</p>
                    <button className='text-[15px] font-[700] bg-[#41b349] w-[145px] h-[38px] text-white mt-6 rounded-[3px]' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.4)"}}>{buttonText}</button>
                </div>
            </div>
            <div className="hidden">
                <h1>Empowering iOS App Development</h1>
                <p>Swift is Apple’s powerful and intuitive programming language designed for building apps across iOS, macOS, watchOS, and tvOS. Introduced in 2014, Swift combines performance, safety, and modern syntax, making it the preferred choice for developers who want to create high-quality, efficient, and secure Apple applications.</p>
                <button>Key Features</button>
            </div>
        </section>
    )
}

export default SwiftFramework
