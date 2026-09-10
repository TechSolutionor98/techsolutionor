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
      badge="HIGH-CONVERTING STOREFRONTS"
      titleLine1="Expert eCommerce Development"
      titleLine2="for Seamless Online"
      titleAccent="Shopping Experiences."
      description="Turnkey Shopify Plus, Magento, and WooCommerce stores designed to increase cart value, maximize checkout conversion, and seamlessly synchronize with enterprise inventory and ERP systems."
      image={EcommerceImg || FallbackImg}
      imageAlt="eCommerce Development Services"
      ctaText="Explore eCommerce"
      ctaHref="#ecommerce-services"
    />
  );
};

export default eCommerceDevBanner;
