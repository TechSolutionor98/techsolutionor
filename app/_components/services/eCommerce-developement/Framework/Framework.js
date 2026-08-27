import React from 'react'
import ECommerce from '../../../../../components/Images/Ecommerceframework.png'
import Image from 'next/image'

const Framework = () => {
  return (
    <section className="w-full bg-white py-8 md:py-12 font-sans">
      <div className="w-full max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* LEFT IMAGE */}
          <div className="w-full md:w-[40%] flex justify-center">
            <Image
              src={ECommerce}
              alt="Ecommerce Illustration"
              width={1000}
              height={1000}
              className="w-[200px] md:w-[260px] lg:w-[350px] object-contain"
              priority
            />
          </div>

          {/* TEXT AREA */}
          <div className="w-full md:w-[60%] flex flex-col gap-4 md:gap-6 text-[#262323]">
            <h1 className="text-[25px] md:text-[32px] font-bold leading-tight">
              Who We Are
            </h1>

            <p className="text-[16px] leading-[30px] max-w-[500px] text-justify text-[#6D6D6D]">
              We are a dedicated team of eCommerce experts, committed to crafting tailored online stores that deliver exceptional user experiences. With a focus on innovative design, seamless functionality, and robust security, we empower businesses to grow and succeed in the competitive eCommerce landscape.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Framework
