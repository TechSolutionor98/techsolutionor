import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const magentoAdvantagesDefault = [
  {
    title: "SEO-Friendly",
    desc: "Magento is designed with SEO optimization in mind, helping businesses improve search rankings with customizable URLs, meta tags, and product page optimization.",
  },
  {
    title: "Mobile Commerce Ready",
    desc: "Magento offers mobile-responsive designs and features, ensuring a seamless shopping experience across smartphones, tablets, and desktops.",
  },
  {
    title: "Strong Developer Community",
    desc: "Magento has a large global community of developers and contributors, providing tutorials, extensions, and support for continuous improvement.",
  },
];

const MagentoAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "magentoadvantages");

  const advantagesData = magentoAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "magentoadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "magentoadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Empowering complex global enterprises with highly customized, high-volume digital storefronts."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default MagentoAdvantages;
