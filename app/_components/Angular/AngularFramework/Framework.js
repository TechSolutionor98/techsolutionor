"use client";
import React from 'react';
import AngularIcon from '@/components/Images/angularicon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const AngularFramework = ({ cmsContent }) => {
  const iconSrc = AngularIcon?.src || AngularIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "angularframework");

  const defaultHeading = "Building Dynamic, Robust Web Applications";
  const defaultParagraph =
    "AngularJS is a powerful JavaScript framework that simplifies the development of dynamic, client-side web applications. It helps developers build feature-rich, single-page applications with a modular structure and maintainable code. AngularJS provides a seamless experience for users by delivering fast, responsive, and highly interactive web applications.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "angularframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "angularframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "angularframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Angular?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Angular Icon"
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

export default AngularFramework;
