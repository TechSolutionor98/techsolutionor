"use client";
import React from 'react';
import GoogleAdsIcon from '@/components/Images/googleadsicon.webp';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const GoogleFramework = ({ cmsContent }) => {
  const iconSrc = GoogleAdsIcon?.src || GoogleAdsIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "googleframework");

  const defaultHeading = "Reach Your Audience with Precision Advertising";
  const defaultParagraph =
    "Google Ads is a powerful advertising platform that allows businesses to reach their target audience through highly targeted and data-driven ad campaigns across Google’s search, display, and video networks. It helps businesses drive traffic, increase brand visibility, and boost conversions by targeting the right users at the right time.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "googleframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "googleframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "googleframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Google Ads?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Google Ads Icon"
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

export default GoogleFramework;
