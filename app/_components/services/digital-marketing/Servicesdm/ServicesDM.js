import React from 'react'
import Image from "next/image";
import CardImg from "../../../../../components/Images/service1.png"; 
import CardImg2 from "../../../../../components/Images/service2.png"; 
import CardImg3 from "../../../../../components/Images/service3.png"; 
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ServicesDM = () => {

    const cards = [
    {
      
      image: CardImg,
      title: "Website Design & Development",
      text: "Create a visually stunning, high-performance online presence with our website design and development services. We focus on user-friendly experiences, responsive layouts, and optimized performance, turning your vision into a functional, engaging website from concept to launch.",
      hasImage: true,
    },
    {
      image: CardImg2,
      title: "Search Engine Optimization",
      text: "Increase your website’s visibility and attract targeted traffic with our professional SEO services. We use proven strategies to improve search engine rankings, drive qualified leads, and enhance your online presence both locally in the UAE and globally.",
      hasImage: true,
    },
    {
      image: CardImg3,
      title: "Social Media Marketing",
      text: "Engage your audience and strengthen your brand through tailored social media campaigns. Our services help grow followers, increase interaction, and generate high-quality leads across major platforms like Facebook, Instagram, LinkedIn, Twitter, and Pinterest.",
      hasImage: true,
    },
  ];


  return (
     <section className="py-16 px-4 bg-gray-50">
      {/* Centered Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center -mt-10 mr-5 mb-10">
        Elevating Your Online Presence with <br /> Expert Digital Marketing Services
      </h2>

      {/* Cards */}
      <div className={`${montserrat.className} grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto`}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="  rounded-lg p-6 flex flex-col items-start text-left text-[25px] text-justify leading-[28.125px] 
                       transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer "
          >
            {/* Image on top */}
            {card.hasImage && (
              <div className="w-full mb-9">
                <Image
                  src={card.image}
                  alt={card.title}
                  className="w-24 object-contain"
                />
              </div>
            )}

            {/* Card Text (below image) */}
            <div>
              <h3
                className={`text-lg md:text-[22px] font-semibold  mb-6 ${
                  card.hasImage ? "text-green-500" : "text-gray-800"
                }`}
              >
                {card.title}
              </h3>
              <p className="text-gray-600 text-[20px] leading-[28.125px] ">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesDM
