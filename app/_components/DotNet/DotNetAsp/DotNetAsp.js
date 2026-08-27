import React from 'react';
import DotNetIcon from '@/components/Images/dotnet.png';
import Image from 'next/image';
import { getCmsVal } from '@/lib/api-helper';

const defaultBullets = [
  "Modern, high-performing applications for both local and global markets",
  "Secure and scalable software architecture",
  "Cost-effective development with faster time-to-market",
  "Continuous support and future-ready solutions"
];

const DotNetAsp = ({ cmsContent }) => {
    const iconSrc = DotNetIcon?.src || DotNetIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "dotnetasp");

    const defaultHeading = "Why Choose .NET for Your Business?";
    const defaultParagraph = ".NET is a versatile and powerful framework widely used for building web, desktop, and mobile applications. With cross-platform capabilities, seamless integration, and robust security features, .NET ensures your applications perform efficiently at scale. By choosing our .NET development services, you benefit from:";

    const heading = getCmsVal(cmsContent, defaultHeading, "dotnetasp");
    const paragraph = getCmsVal(cmsContent, defaultParagraph, "dotnetasp");

    const bullets = defaultBullets.map(b => getCmsVal(cmsContent, b, "dotnetasp"));

    return (
        <div className='w-full my-12 md:my-16 px-5 md:px-20'>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-[1180px] mx-auto">
                <div className="left-asp flex items-center justify-center shrink-0">
                    {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                        <img src={logoUrl} alt='.NET Icon' className='w-[220px] h-[220px] md:w-[260px] md:h-[260px] object-contain' />
                    ) : (
                        <Image alt='.NET Icon' src={DotNetIcon} width={260} height={260} className='w-[220px] h-[220px] md:w-[260px] md:h-[260px] object-contain' />
                    )}
                </div>
                <div className="right-asp flex flex-col items-start max-w-[680px]">
                    <h2 className='text-[20px] md:text-[24px] font-[700] leading-[1.2] text-[#1f1f1f]'>{heading}</h2>
                    <p className='text-[15px] font-[400] leading-[26px] text-gray-700 mt-4'>{paragraph}</p>
                    <ul className='list-disc pl-5 mt-4 space-y-2 text-[15px] font-[400] leading-[24px] text-gray-700'>
                        {bullets.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="hidden">
                <h2>Why Choose .NET for Your Business?</h2>
                <p>.NET is a versatile and powerful framework widely used for building web, desktop, and mobile applications. With cross-platform capabilities, seamless integration, and robust security features, .NET ensures your applications perform efficiently at scale. By choosing our .NET development services, you benefit from:</p>
                <ul>
                    {defaultBullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DotNetAsp;
