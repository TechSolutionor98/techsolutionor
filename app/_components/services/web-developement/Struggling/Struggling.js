"use client";
import React from "react";
import Link from "next/link";
import { useQuote } from "@/app/_context/QuoteContext";

const Struggling = () => {
  const { openQuote } = useQuote();

  const cardsData = [
    {
      title: "Low Organic Traffic & Poor Search Visibility",
      desc: `If your site doesn’t rank for terms like "Web Development Company" or "Web Development Services," your ideal customers are finding your competitors instead. We integrate technical SEO, semantic HTML and lightning-fast architecture to dominate search results, locally and globally.`,
      ctaText: "Audit My SEO Performance →",
      action: openQuote,
    },
    {
      title: "Weak User Engagement & Low Conversions",
      descParts: [
        `High traffic has no value if visitors leave without taking action. Our professional web developers optimize UX, UI and conversion paths to guide users toward leads or purchases. Whether it’s an `,
        { isLink: true, text: "eCommerce website development", href: "/services/ecommerce-development" },
        ` project or a corporate platform, we build sites that convert.`,
      ],
      ctaText: "Optimize My Conversion Rate →",
      action: openQuote,
    },
    {
      title: "Misaligned Brand Identity",
      desc: `Your website is your digital presence. If it looks outdated, it hurts your authority. As a leading web design agency, we craft bespoke web experiences that translate your brand vision into a premium digital identity, establishing you as a leader in the UAE market.`,
      ctaText: "Elevate My Digital Brand →",
      action: openQuote,
    },
    {
      title: "Insufficient Qualified Leads",
      desc: `A website should be your best salesperson. If your current site isn’t generating quality leads, our conversion-focused frameworks optimize every touchpoint. From landing page architecture to strategic CTAs, our web design services turn anonymous visitors into loyal clients.`,
      ctaText: "Scale My Lead Generation →",
      action: openQuote,
    },
  ];

  return (
    <section className="w-full bg-white py-6 md:py-8 lg:py-10 font-sans">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-14">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-[22px] sm:text-[27px] md:text-[32px] font-bold leading-[1.1] sm:leading-[1.12] tracking-tight text-center">
            <span className="block text-[#41b349]">Struggling With Website Performance?</span>
            <span className="block text-[#111111] font-bold mt-0.5 sm:mt-1">Here’s How Our Web Development Services Help</span>
          </h2>
          <p className="mt-2 max-w-[760px] mx-auto text-[13.5px] sm:text-[14.5px] text-gray-600 font-normal leading-relaxed">
            As a results-driven website development company in Dubai and across the UAE, we solve real business challenges with scalable, SEO-friendly web solutions.
          </p>
        </div>

        {/* 2X2 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/90 rounded-[20px] p-5 sm:p-7 lg:p-8 text-center flex flex-col justify-between shadow-[0_6px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(65,179,73,0.1)] transition-all duration-300"
            >
              <div>
                {/* CARD TITLE */}
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111] leading-snug mb-3 text-center">
                  {card.title}
                </h3>

                {/* CARD DESCRIPTION */}
                <p className="text-[13.5px] sm:text-[14.5px] text-gray-600 font-normal leading-relaxed text-center mb-3">
                  {card.descParts ? (
                    <>
                      {card.descParts[0]}
                      <Link
                        href={card.descParts[1].href}
                        className="text-[#41b349] font-medium hover:underline transition-colors"
                      >
                        {card.descParts[1].text}
                      </Link>
                      {card.descParts[2]}
                    </>
                  ) : (
                    card.desc
                  )}
                </p>
              </div>

              {/* CARD CTA LINK */}
              <div className="mt-1 text-center">
                <button
                  onClick={card.action}
                  className="text-[#41b349] font-semibold text-[13.5px] sm:text-[14.5px] hover:underline transition-colors inline-flex items-center justify-center cursor-pointer"
                >
                  {card.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Struggling;
