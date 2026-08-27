"use client";

import Image from "next/image";
import React from "react";
import coorprate from "../../../../components/Images/coorporative.png";
import goal from '../../../../components/Images/goal.png';
import rocket from '../../../../components/Images/rocket.png';
import { getCmsVal } from "@/lib/api-helper";

export const defaultWhatWeDo = {
  sectionTitle: "WHAT WE DO",
  cards: [
    {
      icon: coorprate,
      title: "Cooperative Expert Team",
      description:
        "Our cooperative team of experienced developers, designers, and digital strategists works closely to deliver custom technology solutions tailored to your business goals. By combining technical expertise with clear communication, we ensure smooth execution at every stage, from planning and development to testing and final deployment, for clients worldwide, including the UAE.",
    },
    {
      icon: goal,
      title: "Goals Achiever",
      description:
        "We turn ideas into measurable results. Our goal-focused approach is built on strategic planning, smart problem-solving, and continuous optimization. Whether it's web development, app development, or digital growth solutions, we set ambitious targets and consistently exceed them to help businesses scale faster and smarter.",
    },
    {
      icon: rocket,
      title: "Business Grow",
      description:
        "We help businesses grow with innovative IT services and scalable digital solutions designed to improve efficiency, boost productivity, and increase revenue. Using modern technologies and industry best practices, we build future-ready systems that adapt to your evolving needs, trusted by startups and enterprises across the UAE and global markets.",
    },
  ],
};

const WhatWeDo = ({ cmsContent }) => {
  const sectionTitle = getCmsVal(cmsContent, defaultWhatWeDo.sectionTitle, "whatwedo");

  const cardsData = defaultWhatWeDo.cards.map((item) => {
    const icon = getCmsVal(cmsContent, item.icon, "whatwedo");
    const title = getCmsVal(cmsContent, item.title, "whatwedo");
    const description = getCmsVal(cmsContent, item.description, "whatwedo");
    return {
      icon,
      title,
      description,
    };
  });

  return (
    <div className="-mt-15">
      <div className="heading bg-[#41b349] w-full h-[80px] md:h-[110px] flex justify-center items-center text-white font-bold text-[20px] md:text-[30px]">
        <h1 className="text-[30px] md:text-[50px] font-[800] uppercase">
          {sectionTitle}
        </h1>
      </div>
      <div className="cards bg-[#181818] w-full px-0 py-1 text-white mt-5">
        <div className="cards-maping flex flex-col md:flex-row justify-center items-center gap-10 md:gap-3 mt-10 mb-10 px-5 md:px-0">
          {cardsData.map((item, i) => {
            const isDynamicImg = typeof item.icon === 'string' && (item.icon.startsWith('http') || item.icon.startsWith('/'));
            return (
              <div
                key={i}
                className="bg-[#262323] flex flex-col items-center gap-0 w-full md:w-[400px] min-h-[500px] pt-5 pb-5"
              >
                {isDynamicImg ? (
                  <img
                    src={item.icon}
                    alt={item.title || "icon"}
                    width={800}
                    height={800}
                    className="w-[45px] h-[45px] md:w-[45px] md:h-[45px] object-contain"
                  />
                ) : (
                  <Image
                    src={item.icon}
                    alt={item.title || "icon"}
                    width={800}
                    height={800}
                    className="w-[45px] h-[45px] md:w-[45px] md:h-[45px] object-contain"
                  />
                )}
                <h1 className="text-[25px] font-[700] text-center mt-5">
                  {item.title}
                </h1>
                <p className="text-[14px] md:text-[20px] leading-[30px] font-light text-left mt-3 px-3 md:px-5.5">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
