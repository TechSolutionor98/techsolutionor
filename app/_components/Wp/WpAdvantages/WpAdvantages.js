import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const wpAdvantagesDefault = [
  {
    title: "Flexibility",
    desc: "WordPress can power any type of website, from simple blogs and personal portfolios to complex enterprise portals and online stores.",
  },
  {
    title: "Ease of Use",
    desc: "The user-friendly interface allows users of all skill levels to manage and update their websites efficiently.",
  },
  {
    title: "Regular Updates",
    desc: "Frequent updates keep WordPress secure, reliable, and compatible with the latest web standards and technologies.",
  },
];

const WpAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "wpadvantages");

  const advantagesData = wpAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "wpadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "wpadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Empowering businesses with agile content management, intuitive customization, and ongoing scalability."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default WpAdvantages;
