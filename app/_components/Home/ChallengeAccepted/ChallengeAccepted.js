"use client";
import React from "react";
import CardsBg from '../../../../components/Images/challengecardsbg.png';
import Eclipse from '../../../../components/Images/eclipse.png';
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";

import { getCmsVal } from "@/lib/api-helper";

export const defaultChallengeAccepted = {
  title: "CHALLENGE ACCEPTED",
  subtitle: "TechSolutionor Helps You Fix What's Holding Your Growth Back",
  cards: [
    {
      title: "My Website Isn't Getting Enough Traffic",
      desc: "Without consistent website traffic, you're missing out on valuable visitors, leads, and potential revenue. Our custom SEO services are designed to increase your search engine rankings, attract qualified visitors, and build long-term organic growth. By optimizing your website for both users and search engines, we help your business get discovered globally, with a strong focus on the UAE market.",
      list: [
        "Boost visibility in search results",
        "Capture targeted, high-intent traffic",
        "Convert visitors into leads and customers",
      ],
    },
    {
      title: "My CPL From Digital Ad Campaigns Is Too High",
      desc: "Tired of wasting dollars on ad campaigns? Our paid advertising experts optimize your campaigns by refining audience targeting, improving bidding strategies, and maximizing ROI across platforms like Google Ads and social media.",
      list: [
        "Refine ad targeting for better ROI",
        "Reach your audience where they browse online",
        "Maximize paid ad performance",
      ],
    },
    {
      title: "My Website Isn't Generating Enough Leads",
      desc: "Struggling to get qualified leads in your pipeline? We design data-driven lead generation strategies that turn visitors into qualified prospects. Our tailored digital marketing plans are built around your goals, budget, and target audience, ensuring consistent lead flow.",
      list: [
        "Fill your lead pipeline with qualified prospects",
        "Reach your most valuable audience",
        "Maximize conversion opportunities",
      ],
    },
  ],
  exploreText: "Explore This Service",
};

const ChallengeAccepted = ({ content, cmsContent }) => {
  const rawData = { ...defaultChallengeAccepted, ...(content || {}) };
  const rawTitle = rawData.title || `${rawData.titleBlack || "CHALLENGE"} ${rawData.titleGreen || "ACCEPTED"}`;
  const fullTitle = getCmsVal(cmsContent, rawTitle, "challengeaccepted");
  const titleParts = String(fullTitle).trim().split(" ");
  const titleBlack = titleParts[0] || "CHALLENGE";
  const titleGreen = titleParts.slice(1).join(" ") || "ACCEPTED";

  const subtitle = getCmsVal(cmsContent, rawData.subtitle, "challengeaccepted");
  const exploreText = getCmsVal(cmsContent, rawData.exploreText, "challengeaccepted");

  const rawCards = Array.isArray(rawData.cards) && rawData.cards.length ? rawData.cards : defaultChallengeAccepted.cards;
  const cards = rawCards.map((sourceCard, index) => {
    const fallbackTitle = defaultChallengeAccepted.cards[index]?.title || "";
    const fallbackDesc = defaultChallengeAccepted.cards[index]?.desc || "";

    const cardTitle = getCmsVal(cmsContent, sourceCard?.title || fallbackTitle, "challengeaccepted");
    const cardDesc = getCmsVal(cmsContent, sourceCard?.desc || fallbackDesc, "challengeaccepted");

    const fallbackList = defaultChallengeAccepted.cards[index]?.list || [];
    const sourceList = Array.isArray(sourceCard?.list) && sourceCard.list.length ? sourceCard.list : fallbackList;
    const cardList = sourceList.map((item) => getCmsVal(cmsContent, item, "challengeaccepted"));

    return {
      ...sourceCard,
      title: cardTitle,
      desc: cardDesc,
      list: cardList,
    };
  });

  return (
    <div className="relative mt-10 md:mt-20">
      <h1 className="text-[36px] font-[800] text-center">
        <span className="text-black uppercase p-[8px] bg-[#d9d9d9] ">
          {titleBlack}
        </span>{" "}
        <span className="text-[#41b349]">
          {titleGreen}
        </span>
      </h1>
      <p className="text-center text-[15.5px] mt-1 text-[#232323]">
        {subtitle}
      </p>
      <div className="cards bg-[#262323] w-full h-auto md:h-[500px] mt-30 relative">
        <div className="challaenge-cards flex py-2 flex-col md:flex-row items-center justify-center h-full px-5 md:px-10 gap-5 md:gap-5 ">
          {cards.map((item, i) => (
            <div
              key={i}
              className="card w-full md:w-[350px] h-auto md:h-[500px] rounded-[20px] flex flex-col items-start md:-mt-40  px-7 py-5 gap-2 text-black bg-white"
              style={{ backgroundImage: `url(${CardsBg.src})`, backgroundSize: "cover", boxShadow: " 0px 7px 8px 0px rgba(0, 0, 0, 0.5)" }}
            >
              <h1 className="text-[20px] md:text-[30px] font-[600] leading-[20px] md:leading-[30px] text-start">
                {item.title}
              </h1>
              <p className="text-[15px] mt-3 leading-[20px] ">
                {item.desc}
              </p>
              <ol className="list-decimal text-[15px] mt-3 leading-[20px] ml-4">
                {(Array.isArray(item.list) ? item.list : []).map((listItem, index) => (
                  <li key={index} className="mb-1">
                    {listItem}
                  </li>
                ))}
              </ol>
              <p className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <span>{exploreText}</span> <FaLongArrowAltRight className="font-extralight mt-1" />
              </p>
            </div>
          ))}
        </div>
        <div className="eclipse md:block hidden absolute right-0 -bottom-40">
          <Image src={Eclipse} alt="img" width={250} height={250} className=" " />
        </div>
      </div>
    </div>
  );
};

export default ChallengeAccepted;
