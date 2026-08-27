import Image from "next/image";
import React from "react";
import Link from "next/link";
import Seo from '../../../../components/Images/seo.png';
import Social from '../../../../components/Images/socialmedia.png';
import Content from '../../../../components/Images/content.png';
import App from '../../../../components/Images/app.png';
import Graphics from '../../../../components/Images/graphics.png';
import Web from '../../../../components/Images/web.png';
import ServiceBg from '../../../../components/Images/servicesbg.png';
import { FaArrowRightLong } from "react-icons/fa6";
import { getCmsVal } from "@/lib/api-helper";

export const defaultServicesWeOffer = {
  titleTop: "Services",
  titleBottom: "We Offer",
  description:
    "We deliver innovative digital and IT solutions tailored to your business needs, helping you improve efficiency, scale operations, and accelerate growth. Our services combine advanced technologies, strategic execution, and dedicated customer support to ensure measurable results for businesses worldwide, with a strong focus on the UAE market.",
  exploreButtonText: "Explore More",
  cards: [
    { title: "Search Engine Optimization", link: "/services/seo" },
    { title: "Social Media Marketing", link: "/services/social-media" },
    { title: "Content Writing & Marketing", link: "/services/content-writing" },
    { title: "App Development", link: "/services/app-development" },
    { title: "Graphics Designing", link: "/services/graphics-designing" },
    { title: "Web Development", link: "/services/web-development" },
  ],
};

const serviceImages = [Seo, Social, Content, App, Graphics, Web];

const splitTitle = (fullTitle) => {
  if (!fullTitle) return { line1: "", line2: "" };
  const str = String(fullTitle).trim();
  if (str.includes("\n")) {
    const lines = str.split("\n");
    return { line1: lines[0].trim(), line2: lines.slice(1).join(" ").trim() };
  }
  const parts = str.split(" ");
  if (parts.length <= 1) return { line1: str, line2: "" };
  if (parts.length === 4 && parts[2] === "&") {
    return { line1: parts[0] + " " + parts[1], line2: parts[2] + " " + parts[3] };
  }
  const line2 = parts.pop();
  const line1 = parts.join(" ");
  return { line1, line2 };
};

const ServicesWeOffer = ({ cmsContent }) => {
  const titleTop = getCmsVal(cmsContent, defaultServicesWeOffer.titleTop, "servicesweoffer");
  const titleBottom = getCmsVal(cmsContent, defaultServicesWeOffer.titleBottom, "servicesweoffer");
  const description = getCmsVal(cmsContent, defaultServicesWeOffer.description, "servicesweoffer");
  const exploreButtonText = getCmsVal(cmsContent, defaultServicesWeOffer.exploreButtonText, "servicesweoffer");
  const bgImage = getCmsVal(cmsContent, ServiceBg, "servicesweoffer");

  const cardsData = defaultServicesWeOffer.cards.map((defaultCard, index) => {
    const staticImage = serviceImages[index];
    const imageVal = getCmsVal(cmsContent, staticImage, "servicesweoffer");
    const fullTitle = getCmsVal(cmsContent, defaultCard.title, "servicesweoffer");
    const { line1: titleLine1, line2: titleLine2 } = splitTitle(fullTitle);

    return {
      image: imageVal,
      title: fullTitle,
      titleLine1,
      titleLine2,
      link: defaultCard.link,
    };
  });

  const isBgDynamic = typeof bgImage === 'string' && (bgImage.startsWith('http') || bgImage.startsWith('/'));

  return (
    <div>
      <div className="uppertext px-5 md:px-0 md:w-[798px] flex flex-col items-center justify-center mx-auto my-10 gap-5">
        <h1 className="text-[#262323] text-[45px] font-bold flex items-center flex-col w-full justify-center gap-0" style={{ fontFamily: "Montserrat, sans-serif" }}>
          <span>{titleTop}</span>
          <br />
          <span
            className="text-[45px] -mt-2 font-bold bg-[#41B349] border border-[#41B349] rounded-[4px] shadow-[0px_5px_10px_0px_rgba(65,179,73,0.55)] text-white w-[240px] h-[60px] flex items-center justify-center"
          >
            {titleBottom}
          </span>
        </h1>
        <p className="text-justify text-[15px] font-[500] text-[#262323] leading-[28px]" style={{ fontFamily: "Montserrat, sans-serif" }}>
          {description}
        </p>
      </div>

      <div className="lowercards relative">
        <div className="bg-image absolute -z-10">
          {isBgDynamic ? (
            <img alt="Service Background" src={bgImage} width={650} height={600} />
          ) : (
            <Image alt="Service Background" src={bgImage} width={650} height={600} />
          )}
        </div>

        <div className="cards z-10 grid grid-cols-1 md:grid-cols-3 gap-7 justify-center place-items-center max-w-[1100px] mx-auto px-5">
          {cardsData.map((item, i) => {
            const isImgDynamic = typeof item.image === 'string' && (item.image.startsWith('http') || item.image.startsWith('/'));
            return (
              <Link key={i} href={item.link}>
                <div
                  className="service-cards rounded-[20px] flex flex-col w-[340px] h-[300px] items-center justify-center bg-white gap-5 border border-[#f7f7f7]
                              transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.015),0_8px_20px_rgba(0,0,0,0.08),0_-6px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_12px_26px_rgba(0,0,0,0.11),0_-8px_18px_rgba(0,0,0,0.07)]"
                >
                  {isImgDynamic ? (
                    <img alt="service-image" src={item.image} width={62} height={62} className="object-contain w-[62px] h-[62px]" />
                  ) : (
                    <Image alt="service-image" src={item.image} width={62} height={62} className="object-contain w-[62px] h-[62px]" />
                  )}
                  <h1 className="text-[#41b349] text-[25px] font-[700] text-center leading-[30px]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    <span>{item.titleLine1}</span>
                    <br />
                    <span>{item.titleLine2}</span>
                  </h1>
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="/services">
          <div className="explore-more mt-10 flex justify-center">
            <button className="gap-2 bg-black text-white h-[40px] w-[160px] flex items-center justify-center text-[15px] font-[500] hover:bg-[#41b349] transition duration-300 ease-in-out cursor-pointer">
              <span>{exploreButtonText}</span> <FaArrowRightLong className="mt-1" />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServicesWeOffer;
