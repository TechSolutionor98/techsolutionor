import React from "react";
import { getCmsVal } from "@/lib/api-helper";

const phpAdvantagesDefault = [
  {
    title: "Wide Adoption",
    desc: "PHP is one of the most widely used server-side languages, ensuring a large talent pool, strong community support, and extensive resources.",
  },
  {
    title: "Cost-Effective",
    desc: "As an open-source language, PHP is free to use, making it a budget-friendly solution for web development projects.",
  },
  {
    title: "Rapid Development",
    desc: "PHP’s clear syntax, rich libraries, and robust frameworks allow for faster development cycles, reducing time to market.",
  },
];

const PhpAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "phpadvantages");

  const advantagesData = phpAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "phpadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "phpadvantages"),
  }));

  return (
    <section className="w-full bg-white px-5 py-14 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex justify-center">
          <h2 className="bg-[#41B349] px-7 py-2 text-center text-[34px] font-[700] leading-[1.1] text-white md:text-[38px]">
            {sectionTitle}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advantagesData.map((item, idx) => (
            <article
              key={idx}
              className="min-h-[225px] rounded-[20px] border border-[#bfbfbf] bg-white px-8 py-7 text-center shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="text-[19px] font-[700] leading-[1.2] text-[#1f1f1f]">
                {item.title}
              </h3>
              <p className="mt-5 text-[15px] font-[400] leading-[1.85] text-[#1f1f1f]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </section>
  );
};

export default PhpAdvantages;
