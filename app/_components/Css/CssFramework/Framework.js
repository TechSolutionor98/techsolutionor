"use client";
import React from 'react';
import CssIcon from '@/components/Images/cssicon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const CssFramework = ({ cmsContent }) => {
  const iconSrc = CssIcon?.src || CssIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "cssframework");

  const defaultHeading = "Designing Beautiful and Responsive Websites";
  const defaultParagraph =
    "CSS is the backbone of modern web design, empowering developers to craft responsive and visually stunning websites that deliver seamless experiences across all devices. It plays a pivotal role in managing layout, typography, color schemes, and the overall look and feel of a website, elevating user interactions and engagement.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "cssframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "cssframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "cssframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="CSS?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="CSS Icon"
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

export default CssFramework;
