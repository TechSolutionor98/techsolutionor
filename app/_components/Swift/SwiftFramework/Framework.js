"use client";
import React from 'react';
import SwiftIcon from '@/components/Images/swift.webp';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const SwiftFramework = ({ cmsContent }) => {
  const iconSrc = SwiftIcon?.src || SwiftIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "swiftframework");

  const defaultHeading = "Empowering iOS App Development";
  const defaultParagraph =
    "Swift is Apple’s powerful and intuitive programming language designed for building apps across iOS, macOS, watchOS, and tvOS. Introduced in 2014, Swift combines performance, safety, and modern syntax, making it the preferred choice for developers who want to create high-quality, efficient, and secure Apple applications.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "swiftframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "swiftframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "swiftframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Swift?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Swift Icon"
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

export default SwiftFramework;
