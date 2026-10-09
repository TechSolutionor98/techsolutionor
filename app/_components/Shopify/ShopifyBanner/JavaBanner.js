"use client";

import React from "react";
import CommonTechHero from "@/app/_components/Technologies/CommonTechHero";
import ShopifyImg from "@/components/Images/shopifyicon2.png";

const ShopifyBanner = ({ cmsContent }) => {
  return (
    <CommonTechHero
      cmsContent={cmsContent}
      cmsPrefix="shopifybanner"
      badge="SHOPIFY COMMERCE SOLUTIONS • GLOBAL"
      titleLine1="Custom Shopify Stores"
      titleLine2="Engineered to Convert:"
      titleAccent="Built for Scale."
      description="We design and build custom Shopify storefronts, themes, and checkout workflows. From store setup to app integrations, we deliver seamless shopping experiences."
      image={ShopifyImg}
      imageAlt="Shopify Platform"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default ShopifyBanner;
