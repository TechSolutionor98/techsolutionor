"use client";
import React, { useRef, useEffect, useState } from "react";
import Comma from '../../../../components/Images/comma.png';
import Eclipse from '../../../../components/Images/eclipse.png';
import GoodServicess from '../../../../components/Images/goodservices.png';
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import Value from '../../../../components/Images/value.png';
import Mission from '../../../../components/Images/mission.png';
import Goal from '../../../../components/Images/goal.png';

import { getCmsVal } from "@/lib/api-helper";

const GoodServices = ({ cmsContent }) => {
  const [inView, setInView] = useState(false);
  const barRef = useRef(null);

  const headingLine1 = getCmsVal(cmsContent, "You Can Rely on Us for", "goodservices");
  const headingLine2 = getCmsVal(cmsContent, "High-Quality Digital & IT Services", "goodservices");
  const paragraph1 = getCmsVal(
    cmsContent,
    "TECHSOLUTIONOR was founded to address the growing demand for expert IT advisory, web development, and digital solutions for businesses worldwide. Our mission is to help companies improve efficiency, maximize productivity, and achieve sustainable growth through cutting-edge technology and data-driven strategies.",
    "goodservices"
  );
  const paragraph2 = getCmsVal(
    cmsContent,
    "We believe in long-term partnerships, not one-time projects. By understanding your business challenges, goals, and market, especially within the UAE and global landscape, we deliver customized solutions that drive real results. Partner with TECHSOLUTIONOR to innovate, scale, and stay ahead in a competitive digital world.",
    "goodservices"
  );
  const serviceExcellenceTitle = getCmsVal(cmsContent, "Service Excellence", "goodservices");
  const serviceExcellencePercent = getCmsVal(cmsContent, "90", "goodservices");
  const getInTouchTitle = getCmsVal(cmsContent, "Get In Touch", "goodservices");
  const clientSatisfactionText = getCmsVal(cmsContent, "90% Client Satisfaction", "goodservices");
  const quoteButtonText = getCmsVal(cmsContent, "Get a Quote", "goodservices");
  const rightImage = getCmsVal(cmsContent, GoodServicess, "goodservices");

  const cardsData = [
    {
      icon: getCmsVal(cmsContent, Value, "goodservices"),
      title: getCmsVal(cmsContent, "Our Values", "goodservices"),
      list: ["Awareness", "Automation", "Growth", "Success", "Achievement", "Ease of Access"].map(item => getCmsVal(cmsContent, item, "goodservices")),
    },
    {
      icon: getCmsVal(cmsContent, Mission, "goodservices"),
      title: getCmsVal(cmsContent, "Our Mission", "goodservices"),
      list: ["Trust", "Responsibility", "Professionalism", "Client Satisfaction", "24/7 Support", "Customization"].map(item => getCmsVal(cmsContent, item, "goodservices")),
    },
    {
      icon: getCmsVal(cmsContent, Goal, "goodservices"),
      title: getCmsVal(cmsContent, "Our Goals", "goodservices"),
      list: ["Cooperation", "Quick Services", "Fast Response", "Honesty", "Efficiency", "Integrity"].map(item => getCmsVal(cmsContent, item, "goodservices")),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRightImgDynamic = typeof rightImage === 'string' && (rightImage.startsWith('http') || rightImage.startsWith('/'));

  return (
    <div className="mt-15">
      <div className="goodservices-top px-5 md:pl-6 flex flex-col md:flex-row items-start justify-between scale-105">
        <div className="comma md:mt-10">
          <Image src={Comma} alt="img" width={800} height={800} className="w-[85px] h-[68px] md:w-[105px] md:h-[88px] md:ml-10" />
        </div>
        <div className="info w-full md:w-[1000px]">
          <h1 className="text-center text-[45px] tracking-wide font-[600] font-bold text-[#43b44a] leading-[55px]">
            {headingLine1}
            <br />
            <span className="text-black md:mt-3">
              {headingLine2}
            </span>
          </h1>
          <p
            className="text-justify text-black text-[15px] md:text-[16px] font-[500] leading-[24px] mt-5"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {paragraph1}
          </p>
          <p
            className="text-justify text-black text-[15px] md:text-[16px] font-[500] leading-[24px] mt-5"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {paragraph2}
          </p>
        </div>
        <div className="eclipse md:block hidden mr-5">
          <Image src={Eclipse} alt="img" width={800} height={800} className="w-[40px] h-[40px] md:w-[118px] md:h-[298px]" />
        </div>
      </div>
      <div className="goodservices-med flex flex-col md:flex-row items-start md:items-center px-5 md:px-10 justify-between md:-mt-10 gap-8 mx-15">
        <div className="goodservices-med-left w-full md:w-[50%]">
          <h1
            className="text-[28px] font-bold mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {serviceExcellenceTitle}
          </h1>
          <div className="w-full max-w-[700px]">
            <div className="relative w-full h-[21px] bg-gray-200 rounded overflow-hidden">
              <div
                ref={barRef}
                className="absolute left-0 top-0 h-full bg-[#43b44a] rounded transition-all duration-1000 flex items-center justify-end"
                style={{
                  width: inView ? `${Number(serviceExcellencePercent) || 90}%` : "0%",
                }}
              >
                <span className="text-white font-bold pr-4 text-[16px]">
                  {inView && `${Number(serviceExcellencePercent) || 90}%`}
                </span>
              </div>
            </div>
          </div>
          <div className="get-in-touch md:mx-4 flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 md:mt-10 gap-4">
            <div className="left">
              <h1 className="text-[35px] font-[700] mb-0">
                {getInTouchTitle}
              </h1>
              <p className="text-[15px] text-black font-normal">
                {clientSatisfactionText}
              </p>
            </div>
            <button className="flex items-center gap-2 bg-[#232323] hover:bg-[#333] text-white font-semibold mr-14 px-6 py-3 rounded transition-all duration-200 -mt-4 text-[14px]">
              <CiUser size={18} />
              <span>{quoteButtonText}</span>
            </button>
          </div>
        </div>
        <div className="goodservices-med-right w-full md:w-auto md:flex justify-center hidden">
          {isRightImgDynamic ? (
            <img
              src={rightImage}
              alt="Good Services"
              width={800}
              height={400}
              className="w-[220px] h-[220px] md:w-[450px] md:h-[450px] -mt-0 object-contain"
            />
          ) : (
            <Image src={rightImage} alt="Good Services" width={800} height={400} className="w-[220px] h-[220px] md:w-[450px] md:h-[450px] -mt-0" />
          )}
        </div>
      </div>
      <div className="good-services-bottom mx-20">
        <div className="cards flex items-start justify-start md:justify-between gap-6 md:gap-10 mt-0 mb-10 px-5 md:px-10">
          {cardsData.map((item, i) => {
            const isCardImgDynamic = typeof item.icon === 'string' && (item.icon.startsWith('http') || item.icon.startsWith('/'));
            return (
              <div key={i} className="card relative flex md:pr-2 flex-col items-start gap-0 w-[200px] md:w-[360px] h-[300px] pt-5 pb-5 md:m-0">
                {i < 2 && <span className="hidden md:block absolute top-0 right-[-20px] h-full w-px bg-[#d9d9d9]" />}
                {isCardImgDynamic ? (
                  <img src={item.icon} alt={item.title || "icon"} width={800} height={800} className="w-[35px] h-[35px] md:w-[35px] md:h-[35px] object-contain" />
                ) : (
                  <Image src={item.icon} alt={item.title || "icon"} width={800} height={800} className="w-[35px] h-[35px] md:w-[35px] md:h-[35px] object-contain" />
                )}
                <h1 className="text-[16px] md:text-[25px] font-[700] text-center mt-5 w-full bg-[#d9d9d9] text-black">
                  {item.title}
                </h1>
                <ul className="list-disc text-[14px] md:text-[20px] leading-[25px] font-light text-left mt-3 px-3 md:px-5">
                  {item.list.map((listItem, index) => (
                    <li key={index} className="mb-1 text-black font-semibold text-[12px] md:text-[18px]">
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GoodServices;
