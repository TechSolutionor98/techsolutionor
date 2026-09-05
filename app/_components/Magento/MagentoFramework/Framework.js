"use client";
import React from 'react';
import MagentoIcon from '@/components/Images/magentoicon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const MagentoFramework = ({ cmsContent }) => {
  const iconSrc = MagentoIcon?.src || MagentoIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "magentoframework");

  const defaultHeading = "Powerful and Flexible E-Commerce Platform";
  const defaultParagraph =
    "Introduction to Magento as a leading eCommerce platform, known for its scalability, flexibility, and ability to create tailored online shopping experiences. Mention Magento’s support for multiple storefronts, various payment methods, and its global presence in online retail.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "magentoframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "magentoframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "magentoframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Magento?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Magento Icon"
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

export default MagentoFramework;
