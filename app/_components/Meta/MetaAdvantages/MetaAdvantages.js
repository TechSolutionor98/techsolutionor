import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const metaAdvantagesDefault = [
  {
    title: "Global Reach",
    desc: "Meta connects billions of users worldwide, providing a massive platform for personal interaction and business growth.",
  },
  {
    title: "Innovative Technologies",
    desc: "With cutting-edge VR, AR, and metaverse solutions, Meta is reshaping digital engagement and immersive experiences.",
  },
  {
    title: "Support for Creators and Businesses",
    desc: "Meta provides a rich ecosystem of tools and resources for content creators, entrepreneurs, and businesses to thrive in the digital economy.",
  },
];

const MetaAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "metaadvantages");

  const advantagesData = metaAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "metaadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "metaadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Connecting brands with global audiences through precision campaigns and immersive digital experiences."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default MetaAdvantages;
