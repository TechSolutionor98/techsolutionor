"use client";

import React from "react";
import Image from "next/image";
import { FaLongArrowAltRight, FaCheckCircle } from "react-icons/fa";
import Eclipse from '../../../../components/Images/eclipse.png';
import { getCmsVal } from "@/lib/api-helper";
import {
  SectionBadge,
  SectionHeading,
  HighlightWord,
  SectionParagraph,
  CardHeading,
  CardParagraph,
  ButtonText,
} from "@/components/Typography";

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
    <section className="py-12 sm:py-18 md:py-28 bg-[#FFFFFF] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <SectionBadge variant="light" className="mb-3">
            BUSINESS SOLUTIONS
          </SectionBadge>

          <SectionHeading as="h2" size="section" theme="dark">
            {titleBlack} <HighlightWord>{titleGreen}</HighlightWord>
          </SectionHeading>

          <SectionParagraph size="md" className="mt-3 sm:mt-4">
            {subtitle}
          </SectionParagraph>
        </div>

        {/* Dark Glassmorphic Feature Showcase Container */}
        <div className="bg-[#0D0F12] border border-gray-800/80 rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Ambient Background Glows */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#41B349]/15 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#41B349]/10 rounded-full filter blur-3xl pointer-events-none" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch relative z-10">
            {cards.map((item, i) => (
              <div
                key={i}
                className="bg-[#13161C] border border-gray-800/80 rounded-3xl p-5 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#41B349]/50 hover:-translate-y-2 transition-all duration-300 shadow-xl"
              >
                {/* Glowing Hover Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#41B349] to-[#6BE874] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <SectionBadge variant="dark" pulse={false} className="text-[11px] mb-4">
                    PROBLEM 0{i + 1}
                  </SectionBadge>

                  <CardHeading 
                    as="h3" 
                    theme="light"
                    className="text-lg sm:text-xl md:text-2xl leading-snug tracking-tight mb-3 sm:mb-4 group-hover:text-[#6BE874] transition-colors duration-200"
                  >
                    {item.title}
                  </CardHeading>

                  <CardParagraph 
                    theme="light"
                    size="sm"
                    className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6"
                  >
                    {item.desc}
                  </CardParagraph>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
                    {(Array.isArray(item.list) ? item.list : []).map((listItem, index) => (
                      <li key={index} className="font-jakarta flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-200">
                        <FaCheckCircle className="text-[#41B349] text-sm sm:text-base shrink-0 mt-0.5" />
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Footer */}
                <div 
                  className="pt-4 border-t border-gray-800/80 flex items-center justify-between cursor-pointer group/link"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <ButtonText className="text-xs uppercase tracking-wider text-[#41B349] group-hover/link:text-white transition-colors duration-200">
                    {exploreText}
                  </ButtonText>
                  <div className="w-8 h-8 rounded-full bg-[#181B20] border border-gray-800 flex items-center justify-center text-[#41B349] group-hover/link:bg-[#41B349] group-hover/link:text-white transition-all duration-300">
                    <FaLongArrowAltRight size={13} className="transition-transform group-hover/link:translate-x-0.5" />
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Decorative Eclipse Graphic */}
          <div className="hidden lg:block absolute -right-16 -bottom-16 opacity-30 pointer-events-none">
            <Image src={Eclipse} alt="Decorative" width={220} height={220} className="object-contain" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default ChallengeAccepted;
