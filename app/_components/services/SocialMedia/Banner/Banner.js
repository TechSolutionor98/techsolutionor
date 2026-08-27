import React from 'react'
import ImageBanner from '../../../../../components/Images/smbanner.png'
import BannerBackground from '../../../../../components/Images/bgempty.png'
import Image from 'next/image'

const Banner = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${BannerBackground.src})` }}
        className="bg-[#41b349] bg-cover bg-center bg-no-repeat w-full font-sans"
      >
        <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 md:px-12 lg:px-10 py-10 md:py-14 flex flex-col md:flex-row items-center md:items-start gap-10">

          {/* Text Section */}
          <div className="w-full md:max-w-[380px] text-white text-center md:text-left">
            <h2 className="tracking-wide leading-tight text-[32px]  mb-5 sm:text-[36px] md:text-[40px] font-bold">
              Unlocking the Power of Social Media
            </h2>

            <p className="mt-25 sm:mt-5 text-sm sm:text-base max-w-[500px] mx-auto md:mx-0">
              Discover how we can perform your online presence.
            </p>

            <button className="mt-10 uppercase bg-[#262323] text-white tracking-tight px-5 py-2.5 font-medium rounded-full transition duration-300 ">
              Get Started
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 relative hidden mb-5 md:flex justify-end">
            <div className="relative w-full max-w-[420px] -mt-10 lg:max-w-[480px]  md:ml-10 lg:ml-30">
              <Image
                src={ImageBanner}
                alt="Social Media Banner"
                priority
                width={1000}
                height={1000}
                className="w-[250px]  object-contain"
              />
            </div>
          </div>

        </div>
    </div>
    </div>
  )
}

export default Banner
