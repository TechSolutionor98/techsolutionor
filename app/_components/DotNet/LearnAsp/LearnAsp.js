import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import ASPCORE from '../../../../components/Images/learnasp.svg'
import Bg from '../../../../components/Images/learnaspbg.png'
import Image from 'next/image';
const LearnAsp = () => {
    return (
        <div className='bg-[#f7f7f7] h-[550px] relative flex items-center justify-center px-20 w-full gap-20'>
            <div className="image-div">
                <Image className='absolute  right-0 bottom-0' alt='bgimage' src={Bg} width={350} height={200} />
            </div>
            <div className="LearnAsp-left w-[550px]">
                <h1 className='text-[36px] font-[800]'>Learn ASP.NET Core</h1>
                <p className='text-[16px] font-[300] leading-[30px]'>Learn all about ASP.NET Core has to offer with our tutorials, video courses, and docs.</p>
                <div className="links-tags mt-10">
                    <p className='flex items-center gap-2 text-[14px] font-[700] cursor-pointer'>Learn front-end web development<FaLongArrowAltRight className='mt-1'/> </p>
                    <p className='flex items-center gap-2 text-[14px] font-[700] cursor-pointer'>Learn back-end web development<FaLongArrowAltRight className='mt-1'/> </p>
                </div>
            </div>
            <div className="LearnAsp-right">
                <Image alt='ASP CORE' src={ASPCORE} width={1000} height={1000} className='w-[836px]' />
            </div>
        </div>
    )
}

export default LearnAsp
