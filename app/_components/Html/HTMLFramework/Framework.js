"use client";
import React from 'react';
import HtmlIcon from '@/components/Images/htmlicon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const HtmlFramework = ({ cmsContent }) => {
  const iconSrc = HtmlIcon?.src || HtmlIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "htmlframework");

  const defaultHeading = "The Backbone of the Web";
  const defaultParagraph =
    "HTML (HyperText Markup Language) is the standard language for creating and structuring content on the web. It forms the backbone of every website and web application, providing the essential structure and foundation upon which CSS and JavaScript can build dynamic, interactive experiences.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "htmlframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "htmlframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "htmlframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="HTML?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="HTML Icon"
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

export default HtmlFramework;
