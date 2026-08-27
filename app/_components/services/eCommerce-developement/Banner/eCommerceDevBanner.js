import React from 'react'
import Banner from '../../../../../components/Images/eCommercebanner.png'

const eCommerceDevBanner = () => {
  return (
  <div
  style={{ backgroundImage: `url(${Banner.src})` }}
  className="relative w-full bg-cover bg-no-repeat bg-center"
>
  <div className="absolute inset-0 bg-[#41b349] opacity-50"></div>

  <div className="relative z-10 max-w-[1140px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center md:items-start">
    
    <div className="w-full md:w-[60%] ">
      <button className="text-white bg-[#262323] px-4 py-2 text-sm font-medium mb-4">
        Revolutionize Your Online Store
      </button>

      <h1 className="font-bold leading-tight tracking-wide text-[30px] sm:text-[34px] md:text-[36px] mb-4">
        Expert eCommerce Development for Seamless Shopping Experiences
      </h1>

      <p className="text-white mb-6 text-justify">
        Expert eCommerce development services that create seamless, user-friendly shopping experiences. We build customized, responsive online stores with secure payment integration, optimized for maximum visibility and performance, ensuring your business thrives in the digital marketplace.
      </p>

      <button className="bg-[#41b349] text-white  px-3 py-2 font-medium border border-[#41b349] transition duration-300 hover:bg-white hover:text-black">
        Start Your Project
      </button>
    </div>

  </div>
</div>

  )
}

export default eCommerceDevBanner
