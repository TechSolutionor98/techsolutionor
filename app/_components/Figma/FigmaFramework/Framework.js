"use client";
import React from 'react';
import FigmaIcon from '@/components/Images/figmaicon.webp';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const FigmaFramework = ({ cmsContent }) => {
  const iconSrc = FigmaIcon?.src || FigmaIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "figmaframework");

  const defaultHeading = "Collaborative Design for Teams";
  const defaultParagraph =
    "Figma is a powerful cloud-based design tool that enables teams to collaborate in real-time, allowing for the creation of wireframes, UI designs, and prototypes effortlessly. Known for its ability to streamline the design process, Figma makes collaboration accessible from anywhere, ensuring that design teams can work together seamlessly. With built-in feedback and editing tools, it fosters efficient teamwork and smooth communication.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "figmaframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "figmaframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "figmaframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Figma?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Figma Icon"
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

export default FigmaFramework;
