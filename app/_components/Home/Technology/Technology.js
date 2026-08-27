import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRightLong } from "react-icons/fa6";
import { getCmsVal } from '@/lib/api-helper';

// Technology Icons / Logos
import Laravel from '../../../../components/Images/Laravel.png'
import JavaScript from '../../../../components/Images/JavaScript.png'
import Reactjs from '../../../../components/Images/react2.png'
import Python from '../../../../components/Images/py2.png'
import Swift from '../../../../components/Images/swift2.png'
import PHP from '../../../../components/Images/php-1-1.png'

// Card Design & Background Assets (Client presentation only)
import RectBg1 from '../../../../components/Images/reactangle1.png'
import RectBg2 from '../../../../components/Images/reactangle2.png'
import RectBg3 from '../../../../components/Images/reactangle3.png'
import RectBg4 from '../../../../components/Images/reactangle4.png'
import RectBg5 from '../../../../components/Images/reactangle5.png'
import RectBg6 from '../../../../components/Images/reactangle6.png'
import Techcard from '../../../../components/Images/techcards.png'

export const defaultTechnology = {
  sectionTitle: "Technology",
  description:
    "We leverage modern web and software development technologies to create high-performance digital solutions tailored to your business goals. Our technology-first approach ensures that every project is not only scalable, supporting long-term growth, but also secure, protecting critical data and systems. By optimizing for speed, performance, and user experience, we deliver seamless solutions that engage users and drive results. From dynamic front-end interfaces to robust back-end systems, we follow industry best practices and use proven frameworks to deliver future-ready web and application solutions trusted by businesses globally and across the UAE.",
  exploreButtonText: "Explore More",
  techs: [
    {
      icon: Laravel,
      title: "Laravel",
      description:
        "Laravel is a powerful PHP framework for building secure and scalable web applications. Our Laravel development services create custom backend systems, enterprise platforms, and high-performance web solutions with clean architecture.",
    },
    {
      icon: JavaScript,
      title: "JavaScript",
      description:
        "JavaScript powers dynamic and interactive web experiences. Our JavaScript development services build responsive websites, scalable web applications, and custom frontend solutions optimized for performance and user engagement.",
    },
    {
      icon: Reactjs,
      title: "React",
      description:
        "React is a leading JavaScript library for building fast, interactive user interfaces. Our React development services deliver scalable single-page applications (SPAs), custom web apps, and enterprise frontend solutions optimized for performance and maintainability.",
    },
    {
      icon: Python,
      title: "Python",
      description:
        "Python is a versatile programming language ideal for web development and advanced technologies. Our Python development services deliver scalable backend systems, AI solutions, automation tools, and high-performance web applications.",
    },
    {
      icon: Swift,
      title: "Swift",
      description:
        "Swift is a powerful programming language for building high-performance Apple applications. Our Swift development services help businesses create secure, scalable apps for iOS, macOS, watchOS, and tvOS with seamless user experience and optimized performance.",
    },
    {
      icon: PHP,
      title: "PHP",
      description:
        "PHP is a reliable server-side scripting language for dynamic web applications. Our PHP development services deliver secure, scalable, and custom backend solutions tailored to business requirements.",
    },
  ],
};

const cardStyles = [
  { RectBg: RectBg5, topBgColor: '#FF5047' },
  { RectBg: RectBg3, topBgColor: '#F8D63B' },
  { RectBg: RectBg2, topBgColor: '#41D9F5' },
  { RectBg: RectBg6, topBgColor: 'linear-gradient(180deg, #427DA6 0%, #FDD546 100%)' },
  { RectBg: RectBg1, topBgColor: undefined },
  { RectBg: RectBg4, topBgColor: '#8084C0' },
];

const Technology = ({ cmsContent }) => {
  const sectionTitle = getCmsVal(cmsContent, defaultTechnology.sectionTitle, "technology");
  const description = getCmsVal(cmsContent, defaultTechnology.description, "technology");
  const exploreButtonText = getCmsVal(cmsContent, defaultTechnology.exploreButtonText, "technology");

  const techs = defaultTechnology.techs.map((item, index) => {
    const title = getCmsVal(cmsContent, item.title, "technology");
    const desc = getCmsVal(cmsContent, item.description, "technology");
    const logoUrl = getCmsVal(cmsContent, item.icon, "technology");
    const style = cardStyles[index] || {};

    return {
      ...item,
      title,
      desc,
      logoUrl,
      topBgColor: style.topBgColor,
      RectBg: style.RectBg,
    };
  });

  return (
    <div>
      <div className="tech-top ">
        <div className="textpart bg-[#262323] w-full h-[85px] flex items-center justify-center">
          <h1 className='text-white text-[48px] font-[700] text-center' style={{ fontFamily: "Montserrat, sans-serif" }}>
            {sectionTitle}
          </h1>
        </div>
        <div className="subtext flex items-center justify-center w-full mt-5 px-5 md:px-0 md:py-10">
          <p className='text-justify w-[892px] text-[15px] leading-[20px] text-[#262323]' style={{ fontFamily: "Montserrat, sans-serif" }}>
            {description}
          </p>
        </div>
      </div>
      <div className="tect-bottom flex flex-col items-center justify-center ">
        <div className="cards z-10 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 justify-center place-items-center max-w-[1100px] mx-auto px-5 py-10">
          {techs.map((item, i) => {
            const isLogoDynamic = typeof item.logoUrl === 'string' && (item.logoUrl.startsWith('http') || item.logoUrl.startsWith('/'));
            const isRectBgDynamic = typeof item.rectBgUrl === 'string' && (item.rectBgUrl.startsWith('http') || item.rectBgUrl.startsWith('/'));

            return (
              <div
                className="card w-[330px] h-[390px] flex flex-col justify-between relative rounded-[29px] transition-all duration-300 ease-in hover:scale-105 hover:shadow-2xl cursor-pointer shadow-lg hover:shadow-3xl"
                style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)' }}
                key={i}
              >
                <div 
                  className="images-top rounded-t-[29px] overflow-hidden relative h-[155px]" 
                  style={{ background: item.topBgColor || undefined }}
                >
                  {isRectBgDynamic && !item.topBgColor ? (
                    <img src={item.rectBgUrl} alt='Cardbg' width={1000} height={1000} className="w-full h-[155px] object-cover rounded-t-[29px]" />
                  ) : !item.topBgColor ? (
                    <Image src={item.RectBg} alt='Cardbg' width={1000} height={1000} className="w-full h-[155px] object-cover rounded-t-[29px]" />
                  ) : null}
                  <Image src={Techcard} alt='Cardbg' className='w-[330px] absolute border h-[155px] top-5 -left-2 z-10' width={1000} height={100} />
                </div>
                <div className="bottom-data flex-1 flex flex-col items-center text-center px-5 pb-5 justify-start">
                  {isLogoDynamic ? (
                    <img src={item.logoUrl} alt={item.title} width={117} height={117} className='-mt-20 -mb-5 w-[117px] h-[117px] z-20 object-contain' />
                  ) : (
                    <Image src={item.Image} alt={item.title} width={117} height={117} className='-mt-20 -mb-5 w-[117px] h-[117px] z-20' />
                  )}
                  <h1 className='text-[25px] font-[600] mt-3'>{item.title}</h1>
                  <p className='text-[14px] leading-[22.5px]'>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Link href='/technologies'>
          <div className="explore-more ">
            <button className='gap-2 bg-black text-white h-[40px] w-[160px] flex items-center justify-center text-[15px] font-[500] hover:bg-[#41b349] transition duration-300 ease-in-out cursor-pointer'>
              {exploreButtonText} <FaArrowRightLong className='mt-1' />
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Technology
