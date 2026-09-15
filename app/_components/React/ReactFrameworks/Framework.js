"use client";
import React from 'react';
import ReactIcon from '@/components/Images/reacticon.jpeg';
import WhyChoose from '@/components/WhyChoose/WhyChoose';
import { getCmsVal } from '@/lib/api-helper';

const ReactFrameworks = ({ cmsContent }) => {
  const iconSrc = ReactIcon?.src || ReactIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "reactframeworks");

  const defaultHeading = "Building Dynamic User Interfaces";
  const defaultParagraph =
    "React, developed and maintained by Facebook, is a powerful and widely-used JavaScript library specifically designed for building user interfaces. Since its release in 2013, React has revolutionized the way developers create web applications by introducing a component-based architecture and a declarative programming style. Known for its efficiency, flexibility, and the ability to create highly dynamic and responsive user experiences, React has become the preferred choice for developers around the globe.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "reactframeworks");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "reactframeworks");
  const buttonText = getCmsVal(cmsContent, defaultButton, "reactframeworks");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="React JS?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="React JS Icon"
      imageFit="contain"
      hiddenContent={
        <>
          <h1>{heading}</h1>
          <p>{paragraph}</p>
          <button>{buttonText || defaultButton}</button>
        </>
      }
    />
  );
};

export default ReactFrameworks;
