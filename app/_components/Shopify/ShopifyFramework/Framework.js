"use client";
import React from 'react';
import ShopifyIcon from '@/components/Images/shopifyicon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const ShopifyFramework = ({ cmsContent }) => {
  const iconSrc = ShopifyIcon?.src || ShopifyIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "shopifyframework");

  const defaultHeading = "Your Complete E-Commerce Solution";
  const defaultParagraph =
    "Shopify is a leading e-commerce platform that empowers businesses of all sizes to create and manage their online stores with ease. Known for its flexibility and scalability, Shopify offers a comprehensive suite of tools to help you build, customize, and grow your online business.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "shopifyframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "shopifyframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "shopifyframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Shopify?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Shopify Icon"
      imageFit="contain"
      hiddenContent={
        <>
          <h1>{defaultHeading}</h1>
          <p>{defaultParagraph}</p>
          <button>{buttonText || defaultButton}</button>
        </>
      }
    />
  );
};

export default ShopifyFramework;
