import React from "react";
import { getCmsVal } from "@/lib/api-helper";

const googleKeyFeaturesDefault = [
  {
    title: "Targeted Advertising",
    desc: "Reach the most relevant audience with advanced targeting options, including location, demographics, interests, and device types to ensure your ads appear to the right users at the right time.",
  },
  {
    title: "Keyword Bidding",
    desc: "Control how your ads appear in Google Search by bidding on relevant keywords. This allows businesses to compete for top ad placements and attract high-intent, qualified traffic.",
  },
  {
    title: "Campaign Analytics",
    desc: "Monitor campaign performance with detailed analytics, including impressions, clicks, conversions, and cost metrics to continuously optimize campaigns and maximize ROI.",
  },
  {
    title: "Ad Formats",
    desc: "Utilize multiple ad formats such as search ads, display ads, video ads, and shopping ads to reach users across different stages of the customer journey.",
  },
];

const GoogleCards = ({ cmsContent }) => {
  const defaultBadge = "Key Features";
  const badgeTitle = getCmsVal(cmsContent, defaultBadge, "googlecards");

  const cards = googleKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "googlecards"),
    desc: getCmsVal(cmsContent, item.desc, "googlecards"),
  }));

  return (
    <section className="w-full bg-[#ffff] font-[Roboto,_sans-serif]">
      <div className="mx-auto w-full max-w-[1920px] [--card-width:280px] [--cards-gap:10px] [--cards-side-gap:16px]">
        <div className="px-5 pt-7 md:px-[var(--cards-side-gap)] lg:px-[var(--cards-side-gap)] lg:pt-[28px]">
          <div className="md:mx-auto md:w-[calc((var(--card-width)*4)+(var(--cards-gap)*3))]">
            <div className="inline-flex font-[Roboto,_sans-serif] rounded-t-[20px] bg-[#181818] px-4 py-3 text-[36px] font-[600] leading-[36px] text-white sm:text-[38px] md:px-6 md:py-4 md:text-[36px]">
              {badgeTitle}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#181818] px-5 pb-10 pt-10 md:px-[var(--cards-side-gap)] md:pb-12 md:pt-10 lg:px-[var(--cards-side-gap)] lg:pb-[62px] lg:pt-[60px]">
          <div className="grid grid-cols-1 gap-5 md:[grid-template-columns:repeat(4,var(--card-width))] md:justify-center md:gap-[var(--cards-gap)]">
            {cards.map((card, idx) => (
              <article
                key={idx}
                className="flex w-full min-h-[200px] flex-col items-center rounded-[32px] border border-[#5e5e5e] bg-black px-7 py-7 text-center text-white shadow-[0_0_18px_rgba(0,0,0,0.45)] md:min-h-[220px] md:w-[var(--card-width)] md:max-w-none md:px-6 md:py-7 lg:px-8 lg:py-8"
              >
                <h3 className="mx-auto max-w-[260px] text-[19px] font-[600] leading-[22.8px]">
                  {card.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[305px] text-[15px] font-[400] leading-[28.125px]">
                  {card.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden">
        <div>{defaultBadge}</div>
        {googleKeyFeaturesDefault.map((item, idx) => (
          <div key={idx}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GoogleCards;
