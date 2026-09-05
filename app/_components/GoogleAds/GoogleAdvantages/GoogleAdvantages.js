import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const googleAdvantagesDefault = [
  {
    title: "Flexible Budgeting",
    desc: "With pay-per-click (PPC) advertising, you set your own budget and pay only when users click on your ads. This ensures cost-effectiveness, full control over ad spend, and the ability to scale campaigns as needed.",
  },
  {
    title: "Instant Results",
    desc: "Unlike organic SEO, Google Ads delivers immediate visibility on search results and display networks, allowing businesses to drive targeted traffic, generate leads, and achieve measurable results quickly.",
  },
  {
    title: "Advanced Targeting",
    desc: "Leverage remarketing, custom audiences, and interest-based targeting to reach users most likely to convert. Google Ads enables precise audience segmentation for higher engagement and better ROI.",
  },
];

const GoogleAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "googleadvantages");

  const advantagesData = googleAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "googleadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "googleadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Driving immediate high-intent customer acquisition and compounding return on advertising investment."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
        {googleAdvantagesDefault.map((item, idx) => (
          <div key={idx}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default GoogleAdvantages;
