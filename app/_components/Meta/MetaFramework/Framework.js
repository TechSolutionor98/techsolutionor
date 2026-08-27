import React from 'react';
import MetaIcon from '../../../../components/Images/metaicon.png';
import Image from 'next/image';
import { getCmsVal } from '@/lib/api-helper';

const MetaFramework = ({ cmsContent }) => {
    const iconSrc = MetaIcon?.src || MetaIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "metaframework");

    const defaultHeading = "Connecting People and Building the Future";
    const defaultParagraph = "Meta is a leading technology company dedicated to connecting people through its powerful social platforms while spearheading innovations in virtual reality (VR), augmented reality (AR), and the emerging metaverse. By offering seamless ways for users and businesses to interact, share experiences, and build communities, Meta is transforming how people connect across digital landscapes. Its platforms not only foster social connections but also enable businesses to engage with audiences more effectively.";
    const defaultButton = "Key Features";

    const heading = getCmsVal(cmsContent, defaultHeading, "metaframework");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "metaframework");
    const buttonText = getCmsVal(cmsContent, defaultButton, "metaframework");

    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-[322px] mt-10'>
            <div className="left-image basis-[40%] flex items-center justify-center ">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="Meta Icon" className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                ) : (
                    <Image src={MetaIcon} alt="Meta Icon" width={1000} height={1000} className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                )}
            </div>
            <div className="text-area basis-[60%] flex flex-col justify-between h-full py-5 px-5 gap-6 md:gap-0 md:px-0 md:pr-30">
                <h1 className='text-[20px] font-[700] leading-[24px]'>{heading}</h1>
                <p className='text-[15px] leading-[28px] md:mt-5 text-justify'>{paragraph}</p>
                <button className='text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>Connecting People and Building the Future</h1>
                <p>Meta is a leading technology company dedicated to connecting people through its powerful social platforms while spearheading innovations in virtual reality (VR), augmented reality (AR), and the emerging metaverse. By offering seamless ways for users and businesses to interact, share experiences, and build communities, Meta is transforming how people connect across digital landscapes. Its platforms not only foster social connections but also enable businesses to engage with audiences more effectively.</p>
                <button>Key Features</button>
            </div>
        </div>
    );
};

export default MetaFramework;
