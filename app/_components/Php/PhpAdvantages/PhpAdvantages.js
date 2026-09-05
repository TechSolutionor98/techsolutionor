import React from "react";
import Advantages from "@/components/Advantages/Advantages";
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
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Why global companies rely on PHP for dependable and scalable web solutions."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default PhpAdvantages;
