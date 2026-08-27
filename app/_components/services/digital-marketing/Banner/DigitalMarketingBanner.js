import React from 'react'
import ImageBg from '../../../../../components/Images/digitalbg.png'
import DigitalBanner from '../../../../../components/Images/digitalbanner.svg'
import Image from 'next/image'

const DigitalMarketingBanner = () => {
  return (
    <div>
  <div
    style={{ backgroundImage: `url(${ImageBg.src})` }}
    className="bg-[#41b349] bg-cover bg-center bg-no-repeat w-full font-sans"
  >
    <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 md:px-0  py-12 md:py-16 flex flex-col md:flex-row items-center gap-12">

      {/* TEXT SECTION */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left md:pl-6 lg:pl-1">
        <h1 className="tracking-wide leading-tight text-[30px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold mb-6">
          Result-Driven Digital 
          Marketing Services for 
          Brands
        </h1>

        <p className="text-sm sm:text-base max-w-[520px] mx-auto md:mx-0 leading-relaxed">
          Transform your online presence with our expert digital marketing
          solutions, crafted to boost visibility, engage your audience, and
          drive sustainable growth for businesses in the UAE and worldwide.
        </p>

        <button className="mt-8  uppercase bg-[#41B349] text-white px-6 py-3 text-sm font-medium  transition hover:bg-[#ffffff] hover:text-black">
          Services We Offer
        </button>
      </div>

      {/* IMAGE SECTION */}
      <div className="w-full md:w-1/2 relative hidden md:flex justify-center md:justify-end">
        <div className="relative w-full max-w-[500px] md:-mt-6">
          <Image
            src={DigitalBanner}
            alt="Social Media Banner"
            priority
            width={900}
            height={900}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

    </div>
  </div>
</div>

  )
}

export default DigitalMarketingBanner
