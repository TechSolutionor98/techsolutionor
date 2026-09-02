"use client";

import React from "react";
import Image from "next/image";
import { FaLongArrowAltRight, FaCheckCircle } from "react-icons/fa";
import Eclipse from '../../../../components/Images/eclipse.png';
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
    <section className="py-20 md:py-28 bg-[#FFFFFF] relative overflow-hidden select-none">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] font-extrabold text-xs uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#41B349] animate-pulse" />
            <span>BUSINESS SOLUTIONS</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0F12] tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {titleBlack} <span className="text-[#41B349]">{titleGreen}</span>
          </h2>

          <p className="mt-4 text-[#4A5568] text-base sm:text-lg leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>

        {/* Dark Glassmorphic Feature Showcase Container */}
        <div className="bg-[#0D0F12] border border-gray-800/80 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Ambient Background Glows */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#41B349] to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#41B349]/15 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#41B349]/10 rounded-full filter blur-3xl pointer-events-none" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch relative z-10">
            {cards.map((item, i) => (
              <div
                key={i}
                className="bg-[#13161C] border border-gray-800/80 rounded-3xl p-7 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#41B349]/50 hover:-translate-y-2 transition-all duration-300 shadow-xl"
              >
                {/* Glowing Hover Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#41B349] to-[#6BE874] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 text-[#41B349] text-xs font-bold uppercase tracking-wider mb-4">
                    PROBLEM 0{i + 1}
                  </span>

                  <h3 
                    className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight mb-4 group-hover:text-[#6BE874] transition-colors duration-200"
                    style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed font-medium mb-6">
                    {item.desc}
                  </p>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2.5 mb-6">
                    {(Array.isArray(item.list) ? item.list : []).map((listItem, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-200">
                        <FaCheckCircle className="text-[#41B349] text-base shrink-0 mt-0.5" />
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
                  <span className="text-xs font-extrabold text-[#41B349] uppercase tracking-wider group-hover/link:text-white transition-colors duration-200">
                    {exploreText}
                  </span>
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
