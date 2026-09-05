import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const swiftAdvantagesDefault = [
  {
    title: "Efficiency",
    desc: "Swift accelerates app development with its streamlined syntax, easy-to-use APIs, and rapid compilation.",
  },
  {
    title: "Safety",
    desc: "Built-in features such as optionals, type inference, and memory safety reduce common programming errors and crashes.",
  },
  {
    title: "Community Support",
    desc: "A large, active Swift community and extensive documentation and tutorials ensure rapid learning and continuous problem-solving.",
  },
];

const SwiftAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "swiftadvantages");

  const advantagesData = swiftAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "swiftadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "swiftadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Crafting intuitive, ultra-fast native iOS experiences with cutting-edge engineering precision."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default SwiftAdvantages;
