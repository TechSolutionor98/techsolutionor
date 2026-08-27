import React from "react";
import { getCmsVal } from "@/lib/api-helper";

const dotNetKeyFeaturesDefault = [
  {
    title: "Multi-Language Support",
    desc: ".NET allows development in C#, F#, and VB.NET, giving developers flexibility to choose the best language for each project. Our team leverages these languages to build high-performance, maintainable applications.",
  },
  {
    title: "Cross-Platform Framework",
    desc: "With .NET Core and .NET MAUI, applications run seamlessly across Windows, Linux, macOS, iOS, and Android, enabling businesses to reach broader audiences efficiently.",
  },
  {
    title: "Advanced Security Features",
    desc: "Built-in authentication, authorization, and data protection make .NET ideal for enterprise-grade applications. We integrate these features in every solution to ensure data integrity and compliance.",
  },
  {
    title: "Rich Ecosystem & Libraries",
    desc: ".NET provides extensive libraries, APIs, and development tools, reducing time-to-market while improving functionality. Our developers leverage this ecosystem to deliver scalable and feature-rich applications.",
  },
];

const DotNetCards = ({ cmsContent }) => {
  const defaultBadge = "Key Features";
  const badgeTitle = getCmsVal(cmsContent, defaultBadge, "dotnetcards");

  const cards = dotNetKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "dotnetcards"),
    desc: getCmsVal(cmsContent, item.desc, "dotnetcards"),
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
      </div>
    </section>
  );
};

export default DotNetCards;
