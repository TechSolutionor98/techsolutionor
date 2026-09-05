"use client";
import React from 'react';
import AnalyticsIcon from '@/components/Images/analytics-icon.webp';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const AnalyticsFramework = ({ cmsContent }) => {
  const iconSrc = AnalyticsIcon?.src || AnalyticsIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "analyticsframework");

  const defaultHeading = "Understanding Your Audience";
  const defaultParagraph =
    "Google Analytics empowers businesses to make data-driven decisions by offering in-depth insights into user behavior and website performance. By understanding your audience, you can enhance user experience, boost engagement, and drive business growth.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "analyticsframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "analyticsframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "analyticsframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Google Analytics?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Analytics Icon"
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

export default AnalyticsFramework;
