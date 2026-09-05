"use client";
import React from 'react';
import PhpIcon from '@/components/Images/phpicon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const PhpFramework = ({ cmsContent }) => {
  const iconSrc = PhpIcon?.src || PhpIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "phpframework");

  const defaultHeading = "Dynamic and Server-Side Scripting Language";
  const defaultParagraph =
    "PHP (Hypertext Preprocessor) is a popular server-side scripting language widely used for web development. Known for its ease of use, flexibility, and integration with HTML, PHP powers millions of websites and web applications, including content management systems like WordPress, Drupal, and Joomla.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "phpframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "phpframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "phpframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="PHP?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="PHP Icon"
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

export default PhpFramework;
