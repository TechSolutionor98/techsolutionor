"use client";
import React from 'react';
import WpIcon from '@/components/Images/wpicon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const WpFramework = ({ cmsContent }) => {
  const iconSrc = WpIcon?.src || WpIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "wpframework");

  const defaultHeading = "The Leading Content Management System";
  const defaultParagraph =
    "WordPress is the world’s most popular content management system (CMS), powering over 40% of all websites. Known for its flexibility, ease of use, and extensive plugin ecosystem, WordPress is the go-to platform for creating everything from blogs and portfolios to e-commerce stores and enterprise websites.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "wpframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "wpframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "wpframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="WordPress?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="WordPress Icon"
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

export default WpFramework;
