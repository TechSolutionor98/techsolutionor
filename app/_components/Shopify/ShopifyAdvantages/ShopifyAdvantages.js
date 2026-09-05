import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const shopifyAdvantagesDefault = [
  {
    title: "Ease of Use",
    desc: "Shopify’s intuitive interface allows users of all technical levels to create and manage online stores without prior coding experience.",
  },
  {
    title: "Scalability",
    desc: "Whether launching a new store or expanding an established business, Shopify scales with your needs, offering flexible plans and advanced features.",
  },
  {
    title: "Security",
    desc: "Shopify ensures SSL encryption and PCI compliance, protecting your store, customer data, and online transactions.",
  },
];

const ShopifyAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "shopifyadvantages");

  const advantagesData = shopifyAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "shopifyadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "shopifyadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Unlocking world-class eCommerce sales channels with seamless shopping and high-converting checkouts."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default ShopifyAdvantages;
