import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const shopifyKeyFeaturesDefault = [
  {
    title: "Mobile Optimization",
    desc: "Shopify stores are fully responsive, providing a seamless shopping experience on smartphones, tablets, and desktops.",
  },
  {
    title: "Multi-Channel Selling",
    desc: "Sell your products across social media, marketplaces, and in-person using Shopify’s integrated POS system.",
  },
  {
    title: "Inventory Management",
    desc: "Manage inventory efficiently with real-time updates, bulk uploads, and automated stock control, keeping your store organized and up-to-date.",
  },
  {
    title: "Customer Support",
    desc: "Shopify provides 24/7 customer support, ensuring you receive assistance whenever you need help running your store smoothly.",
  },
];

const ShopifyCards = ({ cmsContent }) => {
  const cards = shopifyKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "shopifycards"),
    desc: getCmsVal(cmsContent, item.desc, "shopifycards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default ShopifyCards;
