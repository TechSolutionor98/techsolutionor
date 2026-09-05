import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const analyticsAdvantagesDefault = [
  {
    title: "Data-Driven Decisions",
    desc: "Use comprehensive insights to make informed marketing and business decisions, improving strategies and overall user experience.",
  },
  {
    title: "Integration with Google Ads",
    desc: "Seamless connection with Google Ads allows measurement of campaign performance and better ad targeting.",
  },
  {
    title: "Free and Scalable",
    desc: "Google Analytics offers a free, robust version, with the option to upgrade to Google Analytics 360 for advanced features and enterprise scalability.",
  },
];

const AnalyticsAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "analyticsadvantages");

  const advantagesData = analyticsAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "analyticsadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "analyticsadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Unlocking transparent user attribution, conversion visibility, and strategic performance metrics."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
        {analyticsAdvantagesDefault.map((item, idx) => (
          <div key={idx}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnalyticsAdvantages;
