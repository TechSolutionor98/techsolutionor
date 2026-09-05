import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const dotNetAdvantagesDefault = [
  {
    title: "High Performance & Reliability",
    desc: ".NET applications are optimized for speed and can handle large-scale operations without downtime. Businesses in the UAE and globally benefit from stable, responsive software.",
  },
  {
    title: "Scalability for Growing Businesses",
    desc: "From startups to large enterprises, .NET solutions grow with your business. Our services ensure your applications are ready for expansion without costly redevelopment.",
  },
  {
    title: "Seamless Integration & Maintenance",
    desc: ".NET’s modular architecture simplifies integration with existing systems, APIs, and third-party services. Our team provides ongoing support, ensuring long-term maintainability and adaptability.",
  },
];

const DotNetAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "dotnetadvantages");

  const advantagesData = dotNetAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "dotnetadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "dotnetadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Enterprise-grade architecture delivering mission-critical security, speed, and continuous reliability."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default DotNetAdvantages;
