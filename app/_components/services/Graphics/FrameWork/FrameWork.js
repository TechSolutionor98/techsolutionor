import React from 'react'
import GirlImage from '../../../../../components/Images/girlimage.jpg'
import Image from 'next/image'

const FrameWork = () => {
  return (
    <div>
<div className="relative w-full bg-white mt-10 flex justify-center items-center">
      <div
        className=" max-w-[1140px] mx-auto px-6 md:px-10  py-10 md:py-5 flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="w-full md:w-1/2 scale-90 flex flex-col gap-5 md:gap-6">
        <span className=' text-white md:w-[450px] bg-black px-0 py-2 text-center
        shadow-[0_5px_8px_0_#41B349]'>A VARIETY OF DESIGN SERVICES AT YOUR FINGERTIPS</span>
          <h2 className="uppercase text-[#41b349] text-[20px]  md:text-[30px] font-bold  font-[sans-serif] leading-tight">
            Comprehensive Design Solutions for Every Need
          </h2>

          <p className="text-[15px] text-justify max-w-[800px]">
            Our services include branding and identity creation, ensuring your brand’s essence is captured and communicated effectively. From logo design that leaves a lasting impression to print materials that stand out, we cover all aspects of graphic design. Our web graphics are crafted to enhance user experience and engagement, while our custom illustrations add a personal touch to your projects.
          </p>
          <p className="text-[15px] text-justify max-w-[800px]">
            We also specialize in marketing materials, helping you create visually appealing and impactful content for both digital and print media. Our design solutions are not just about aesthetics; they are strategically developed to support your business goals and drive success.
          </p>
        </div>
        <div className="md:flex w-full md:w-1/2 mt-[43px] flex md:relative md:mb-20 justify-center md:justify-end relative md:right-[50px]">
          <Image
            src={GirlImage}
            alt="Mobile App Services"
            width={200}
            height={200}
            className="w-full max-w-[350px] object-contain"
          />
        </div>
      </div>
      </div>
    </div>
  )
}

export default FrameWork
