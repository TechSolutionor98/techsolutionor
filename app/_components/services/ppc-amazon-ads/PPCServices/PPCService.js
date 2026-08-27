import React from 'react'
import Image from "next/image";
import Angular from "../../../../../components/Images/icon1.png";
import MicrosoftIcon from "../../../../../components/Images/icon2.png";
import GoogleAdsIcon from "../../../../../components/Images/icon3.png";
import Shoping from '../../../../../components/Images/icon4.png';
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const PPCServices = () => {
  const cards = [
    {
      img: Angular,
      title: "Google Ads",
      text: "Increase targeted traffic and conversions with our Google Ads management services in UAE. We create fully optimized campaigns that reach high-intent customers, maximize visibility, and deliver measurable results for businesses in Dubai, Abu Dhabi, and international markets.",
    },
    {
      img: MicrosoftIcon,
      title: "Microsoft Ads",
      text: "Expand your reach and ROI with tailored Microsoft Ads campaigns in Dubai and UAE. Leveraging the Bing network, we drive qualified leads, boost online visibility, and ensure your ads target the right audience for maximum conversions.",
    },
    {
      img: GoogleAdsIcon,
      title: "Social Media Ads",
      text: "Enhance engagement and brand awareness through strategic social media advertising services in UAE. We design targeted campaigns across Facebook, Instagram, LinkedIn, and other platforms to generate measurable results and increase conversions.",
    },
    {
      img: Shoping,
      title: "Shopping Campaign",
      text: "Boost online sales with visually compelling Amazon Shopping Campaigns in Dubai, UAE, and globally. We optimize sponsored product ads and Amazon campaigns to highlight your products, attract high-intent buyers, and maximize ecommerce conversions.",
    },
  ];

  return (
    <section className={`${montserrat.className} py-6 px-6 bg-white font-sans`}>
      <div className="max-w-[1280px] mx-auto">
                {/* Tag */}
                <div className="inline-block bg-[#262323] text-white px-6 py-2 rounded-sm mb-6 shadow-[4px_4px_0px_#41B349]">
                    <span className="text-sm font-bold uppercase tracking-widest text-[12px]">
                        CAPABILITIES
                    </span>
                    
                </div>
                
                <h2 className="text-[32px] sm:text-[40px] font-bold text-[#262323] mb-16 max-w-[600px] leading-tight">
                    Drive traffic, generate leads,<br className="hidden md:block" /> achieve success 
                    with our paid search services!
                </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="
                group
                border-[1.5px] border-[#41B349]
                rounded-[24px]
                p-4
                bg-white
                transition-all duration-500 ease-out
                hover:scale-[1.05]
                hover:-translate-y-2
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
              "
            >
              {/* ICON IMAGE */}
              <div
                className="
                  w-16 h-16 mb-6
                  flex items-center justify-center
                  rounded-full
                  
                  transition-transform duration-500
                  group-hover:scale-110
                "
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>

              <h3 className="text-[20px] font-semibold text-[#262323] mb-6">
                {card.title}
              </h3>

              <p className="text-gray-600 text-[16px] leading-[1.6]">
                {card.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default PPCServices
