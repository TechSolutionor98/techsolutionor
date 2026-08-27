import React from 'react'
import PythonIcon from '../../../../components/Images/pythonicon.webp'
import Image from 'next/image'
import { getCmsVal } from '@/lib/api-helper'

const PythonFramework = ({ cmsContent }) => {
    const iconSrc = PythonIcon?.src || PythonIcon;
    const logoUrl = getCmsVal(cmsContent, iconSrc, "pythonframework");

    const heading = getCmsVal(cmsContent, "Versatile and Powerful Programming Language", "pythonframework");
    const paragraph = getCmsVal(
        cmsContent,
        "Python is a high-level, interpreted programming language known for its readability, simplicity, and versatility. Created by Guido van Rossum and first released in 1991, Python has grown to become one of the most popular languages in the world, used in a wide range of applications from web development and data analysis to machine learning and automation.",
        "pythonframework"
    );
    const buttonText = getCmsVal(cmsContent, "Key Features", "pythonframework");

    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-[262px] mt-10'>
            <div className="left-image basis-[40%] flex items-center justify-center ">
                {typeof logoUrl === 'string' && logoUrl !== iconSrc ? (
                    <img src={logoUrl} alt="Python Icon" className='w-[200px] h-[200px] md:w-[262px] md:h-[262px] object-contain'/>
                ) : (
                    <Image src={PythonIcon} alt="Python Icon" width={1000} height={1000} className='w-[200px] h-[200px] md:w-[262px] md:h-[262px]'/>
                )}
            </div>
            <div className="text-area basis-[60%] flex flex-col justify-between h-full py-5 px-5 gap-6 md:gap-0 md:px-0 md:pr-30">
                <h1 className='text-[20px] font-[700] leading-[24px]'>{heading}</h1>
                <p className='text-[15px] leading-[28px] md:mt-5 text-justify'>{paragraph}</p>
                <button className='text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>{buttonText}</button>
            </div>
            <div className="hidden">
                <h1>Versatile and Powerful Programming Language</h1>
                <p>Python is a high-level, interpreted programming language known for its readability, simplicity, and versatility. Created by Guido van Rossum and first released in 1991, Python has grown to become one of the most popular languages in the world, used in a wide range of applications from web development and data analysis to machine learning and automation.</p>
                <button>Key Features</button>
            </div>
        </div>
    )
}

export default PythonFramework
