"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import ShopifyImg from "@/components/Images/shopifyicon2.png";

const ShopifyBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="shopifybanner"
      badge="GLOBAL COMMERCE ENGINE"
      titleLine1="Shopify: High-Converting"
      titleLine2="E-Commerce Stores for"
      titleAccent="Global Retailers."
      description="Shopify provides world-class e-commerce infrastructure. We design and build custom Shopify Plus storefronts, bespoke apps, ERP integrations, and seamless multi-currency checkout experiences."
      image={ShopifyImg}
      imageAlt="Shopify Platform"
      ctaText="Explore Shopify"
      ctaHref="#framework"
    />
  );
};

export default ShopifyBanner;
