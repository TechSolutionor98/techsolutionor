import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const magentoKeyFeaturesDefault = [
  {
    title: "Customizable Storefronts",
    desc: "Magento provides highly customizable themes and layouts, allowing businesses to create unique storefronts aligned with their brand identity.",
  },
  {
    title: "Robust Inventory Management",
    desc: "Manage stock across multiple warehouses and sales channels seamlessly with Magento’s advanced inventory tools.",
  },
  {
    title: "Scalability",
    desc: "Magento is built to scale with business growth, handling large product catalogs, high traffic, and peak promotions without compromising performance.",
  },
  {
    title: "Third-Party Integrations",
    desc: "Magento easily integrates with payment gateways, shipping providers, and marketing platforms, ensuring smooth operations and enhanced functionality.",
  },
];

const MagentoCards = ({ cmsContent }) => {
  const cards = magentoKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "magentocards"),
    desc: getCmsVal(cmsContent, item.desc, "magentocards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default MagentoCards;
