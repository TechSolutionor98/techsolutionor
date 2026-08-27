import React from 'react';
import AngularIcon from "../../../../components/Images/angularicon.png";
import Image from 'next/image';
import { getCmsVal } from '@/lib/api-helper';

const AngularFramework = ({ cmsContent }) => {
    const iconSrc = AngularIcon?.src || AngularIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "angularframework");

    const defaultHeading = "Building Dynamic, Robust Web Applications";
    const defaultParagraph = "AngularJS is a powerful JavaScript framework that simplifies the development of dynamic, client-side web applications. It helps developers build feature-rich, single-page applications with a modular structure and maintainable code. AngularJS provides a seamless experience for users by delivering fast, responsive, and highly interactive web applications.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "angularframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "angularframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "angularframework");

    return (
        <div className="flex flex-col max-w-[min(100%,1140px)] mx-auto h-auto min-h-auto md:flex-row items-center justify-center md:h-auto md:min-h-auto md:mt-10 mt-5 gap-4 md:gap-2">
            <div className="left-image basis-full md:basis-[40%] flex items-center justify-center ">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="Angular Icon" className="w-[200px] sm:w-[200px] h-auto md:w-[230px] lg:w-[262px] pb-10 object-contain"/>
                ) : (
                    <Image src={AngularIcon} alt="Angular Icon" width={1000} height={1000} className="w-[200px] sm:w-[200px] h-auto md:w-[230px] lg:w-[262px] pb-10 object-contain"/>
                )}
            </div>
            <div className="text-area basis-full md:basis-[60%] flex flex-col py-5 px-5 gap-5 md:gap-8 text-[#262323] md:px-10 md:pr-10 tracking-wider scale-100">
                <h1 className="text-[20px] font-[700] leading-[30px]">{heading}</h1>
                <p className="text-[16px] leading-[30px] max-w-[664px] text-justify text-[#6D6D6D]">{paragraph}</p>
                <button className="text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white" style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)" }}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>Building Dynamic, Robust Web Applications</h1>
                <p>AngularJS is a powerful JavaScript framework that simplifies the development of dynamic, client-side web applications. It helps developers build feature-rich, single-page applications with a modular structure and maintainable code. AngularJS provides a seamless experience for users by delivering fast, responsive, and highly interactive web applications.</p>
                <button>Key Features</button>
            </div>
        </div>
    );
};

export default AngularFramework;
