import React from 'react'
import GraphicsBanner from '../../../../../components/Images/Graphicbanner.png'
import CircleImage from '../../../../../components/Images/colorcircle.png'
import Image from 'next/image'

const GraphicBanner = () => {
  return (
    <section className="bg-[#262323b3] w-full font-sans overflow-hidden py-8 md:py-14">
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10">
        
        {/* Left Text Section */}
        <div className="w-full md:w-[52%] text-white text-center md:text-left z-10">
          <h1 className="font-bold tracking-tight leading-[1.25] text-[26px] sm:text-[32px] md:text-[34px] lg:text-[38px] max-w-[560px]">
            <span className="text-white block">Graphic Design Services in</span>
            <span className="text-[#41b349] block">Dubai & UAE That Transform</span>
            <span className="text-[#41b349] block">Ideas into Powerful Brands</span>
          </h1>

          <p className="mt-5 max-w-[520px] text-gray-200 text-sm sm:text-base leading-relaxed mb-8 mx-auto md:mx-0">
            Tech Solutionor provides professional graphic design services in Dubai and across the UAE, helping businesses create powerful visual identities that stand out. Our creative designers deliver branding, marketing graphics, social media visuals and digital design solutions that strengthen your brand presence and engage audiences locally and worldwide.
          </p>

          <button className="uppercase bg-[#41b349] text-white px-7 py-3 text-sm font-semibold border border-[#41b349] transition duration-300 hover:bg-white hover:text-black shadow-lg cursor-pointer">
            Start Your Project &rarr;
          </button>
        </div>

        {/* Right Images Section - Face centered inside the circle */}
        <div className="w-full md:w-[48%] flex items-center justify-center relative min-h-[340px] md:min-h-[400px]">
          {/* Color Circle as background */}
          <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[380px] md:h-[380px] flex items-center justify-center">
            <Image
              src={CircleImage}
              alt="Decorative Color Circle"
              className="w-full h-full object-contain z-0"
              priority
            />
            {/* Person Silhouette Overlay - Shifted downward so face is in exact center */}
            <Image
              src={GraphicsBanner}
              alt="Graphic Design Representation"
              className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 w-[62%] max-w-[220px] sm:max-w-[240px] md:max-w-[260px] object-contain z-10"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default GraphicBanner
