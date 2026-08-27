import React from 'react';
import AnalyticsIcon from "@/components/Images/analytics-icon.webp";
import Image from 'next/image';
import { getCmsVal } from '@/lib/api-helper';

const AnalyticsFramework = ({ cmsContent }) => {
    const iconSrc = AnalyticsIcon?.src || AnalyticsIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "analyticsframework");

    const defaultHeading = "Understanding Your Audience";
    const defaultParagraph = "Google Analytics empowers businesses to make data-driven decisions by offering in-depth insights into user behavior and website performance. By understanding your audience, you can enhance user experience, boost engagement, and drive business growth.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "analyticsframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "analyticsframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "analyticsframework");

    return (
        <div className="w-full h-auto flex flex-col md:flex-row items-center justify-center max-w-[1140px] md:h-[281.594px] mt-11 mx-auto pb-5">
            <div className="left-image basis-[40%] flex items-center justify-center w-[436px] h-[261px] mb-2 pb-5">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="Analytics Icon" className="w-[130px] h-[130px] md:w-[300px] md:h-[240px] ml-20 mt-2 object-contain"/>
                ) : (
                    <Image src={AnalyticsIcon} alt="Analytics Icon" width={800} height={800} className="w-[130px] h-[130px] md:w-[300px] md:h-[240px] ml-20 mt-2 object-contain"/>
                )}
            </div>
            <div className="font-sans font-normal w-full md:w-[684px] md:h-[281.594px] ml-0 md:ml-16 basis-[60%] flex flex-col justify-between p-[10px] gap-2 md:gap-0 text-[#262323] tracking-[0.5px] box-border">
                <h1 className="text-[20px] font-[700] leading-[30px]">{heading}</h1>
                <p className="text-[16px] leading-[30px] md:mt-2 tracking-[0.5px] text-justify md:w-[644px] md:h-[112.5px]">{paragraph}</p>
                <button className="text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white" style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>Understanding Your Audience</h1>
                <p>Google Analytics empowers businesses to make data-driven decisions by offering in-depth insights into user behavior and website performance. By understanding your audience, you can enhance user experience, boost engagement, and drive business growth.</p>
                <button>Key Features</button>
            </div>
        </div>
    );
};

export default AnalyticsFramework;
