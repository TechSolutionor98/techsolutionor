"use client";
import React from 'react';
import FlutterIcon from '@/components/Images/fluttericon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const FlutterFramework = ({ cmsContent }) => {
  const iconSrc = FlutterIcon?.src || FlutterIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "flutterframework");

  const defaultHeading = "Building Seamless Multi-Platform Applications";
  const defaultParagraph =
    "Flutter is a comprehensive framework designed to develop natively compiled applications for mobile, web, and desktop, all from a single codebase. It empowers developers to create visually stunning, high-performance, and fully customized applications, ensuring a seamless user experience across different platforms. Flutter stands out for its ability to streamline development, making it efficient while maintaining design quality and performance.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "flutterframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "flutterframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "flutterframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Flutter?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Flutter Icon"
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

export default FlutterFramework;
