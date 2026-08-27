import React from 'react'
import LaravelIcon from '../../../../components/Images/reacticon.jpeg'
import Image from 'next/image'

const ReactFrameworks = () => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-[352px] mt-10'>
            <div className="left-image basis-[40%] flex items-center justify-center ">
                <Image src={LaravelIcon} alt="Laravel Icon" width={1000} height={1000} className='w-[200px] h-[200px] md:w-[262px] md:h-[262px]'/>
            </div>
            <div className="text-area basis-[60%] flex flex-col justify-between h-full py-5 px-5 gap-6 md:gap-5 md:px-0 md:pr-30">
                <h1 className='text-[20px] font-[700] leading-[24px]'>Building Dynamic User Interfaces</h1>
                <p className='text-[15px] leading-[28px] md:mt-5 text-justify'>React, developed and maintained by Facebook, is a powerful and widely-used JavaScript library specifically designed for building user interfaces. Since its release in 2013, React has revolutionized the way developers create web applications by introducing a component-based architecture and a declarative programming style. Known for its efficiency, flexibility, and the ability to create highly dynamic and responsive user experiences, React has become the preferred choice for developers around the globe.</p>
                <button className='text-[15px] font-[700] bg-[#41b349] w-[150px] h-[39px] text-white' style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>Key Features</button>
            </div>

        </div>
    )
}

export default ReactFrameworks
