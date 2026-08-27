import React from 'react';
import MetaBg from '@/components/Images/metabg.png';
import { getCmsVal } from '@/lib/api-helper';

const MetaBanner = ({ cmsContent }) => {
    const bgImageSrc = MetaBg?.src || MetaBg;
    const bgImage = getCmsVal(cmsContent, bgImageSrc, "metabanner");

    const defaultLine1 = "Meta: Innovative Technology";
    const defaultLine2 = "for Social Platforms";
    const defaultDesc = "Meta develops cutting-edge technologies that power social platforms and next-generation digital experiences. From connecting communities to enabling interactive features, Meta’s solutions drive innovation and engagement across the digital ecosystem.";

    const line1 = getCmsVal(cmsContent, defaultLine1, "metabanner");
    const line2 = getCmsVal(cmsContent, defaultLine2, "metabanner");
    const desc = getCmsVal(cmsContent, defaultDesc, "metabanner");

    return (
        <div
            className='w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] relative flex items-center justify-center text-white px-5 md:px-0'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#000054'
            }}
        >
            <div className="text-area flex flex-col w-[680px] max-w-full md:absolute left-10 md:left-16 lg:left-24 px-4 z-10">
                <h1 className='text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-[1.18] text-white tracking-tight'>
                    {line1} <br />
                    {line2}
                </h1>
                <p className='text-[14px] sm:text-[15px] leading-[25px] mt-4 text-gray-200 font-normal max-w-[500px]'>
                    {desc}
                </p>
            </div>
            <div className="hidden">
                <h1>Meta: Innovative Technology</h1>
                <h1>for Social Platforms</h1>
                <p>Meta develops cutting-edge technologies that power social platforms and next-generation digital experiences. From connecting communities to enabling interactive features, Meta’s solutions drive innovation and engagement across the digital ecosystem.</p>
            </div>
        </div>
    );
};

export default MetaBanner;
