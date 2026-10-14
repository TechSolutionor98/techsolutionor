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
    />
  );
};

export default eCommerceDevBanner;
