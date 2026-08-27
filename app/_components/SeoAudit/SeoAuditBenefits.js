"use client";
import React from "react";

const SeoAuditBenefits = () => {
  const benefits = [
    {
      title: "Identify Hidden SEO Issues",
      desc: "Uncover technical errors, crawl problems, indexing gaps, and on-page weaknesses that may be silently limiting your rankings in Dubai, across the UAE, and global search results.",
    },
    {
      title: "Boost Your Search Rankings",
      desc: "Improve your visibility on Google UAE and international search engines by optimizing key ranking factors that directly impact your traffic and online authority.",
    },
    {
      title: "Increase Traffic & Analyze Competitors",
      desc: "Attract high-intent visitors while discovering what top competitors in your industry are doing right, and where you can gain a strategic advantage.",
    },
    {
      title: "Clear Actionable Insights",
      desc: "Receive a step-by-step SEO roadmap tailored to your business goals, designed to turn your website into a consistent lead-generating and revenue-driving asset.",
    },
  ];

  return (
    <section className="py-0">
  
  {/* Heading container */}
  <div className="container px-5 md:px-10 md:-mb-22 md:ml-40">
    <div className="">
      <span className="inline-block font-bold bg-[#181818] text-white px-2 py-4 rounded-[10px] text-3xl md:text-[33px] tracking-wide  ">
        Benefits of a Free SEO Audit
      </span>
      
    </div>
  </div>

  {/* Full width background */}
  <div className="w-full bg-[#181818] py-10 mt-20">
    <div className="container px-5 md:px-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-2">
        {benefits.map((benefits, idx) => (
          <div
            key={idx}
            className="card w-full md:w-[277.5px] md:h-[252px] p-5 flex flex-col items-center justify-start text-white bg-black border-1 border-gray-400 rounded-[20px]"
            style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)" }}
          >
            <h1 className="text-[19px] font-[600] mb-5 text-center">
              {benefits.title}
            </h1>
            <p className="text-[15px] font-[400] leading-[28px] text-center">
              {benefits.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>

</section> 
  );
};

export default SeoAuditBenefits;
