"use client";

import React from "react";
import CommonServiceHero from "@/app/_components/services/common/CommonServiceHero";
import EcommerceImg from "@/components/Images/eCommercebanner.png";
import FallbackImg from "@/components/Images/servicesicon4.png";

const eCommerceDevBanner = ({ cmsContent }) => {
  return (
    <CommonServiceHero
      cmsContent={cmsContent}
      cmsPrefix="ecommercebanner"
      badge="HIGH-CONVERTING STOREFRONTS • GLOBAL"
      titleLine1="Ecommerce Development"
      titleLine2="Company Built for Scale:"
      titleAccent="Trusted Worldwide."
      description="We build fast, secure ecommerce storefronts and custom shopping platforms. From Shopify to custom stores, we deliver smooth checkouts and reliable integrations."
      image={EcommerceImg || FallbackImg}
      imageAlt="eCommerce Development Services"
      showPrimaryCta={false}
      quoteButtonStyle="primary"
      headingClassName="text-[26px] sm:text-3xl md:text-[50px] lg:text-[56px] leading-[1.08] sm:leading-[1.02] mb-5"
      paragraphClassName="max-w-[480px] mb-6 text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#4A5568]"
    />
  );
};

export default eCommerceDevBanner;
