"use client";
import React from 'react';
import MetaIcon from '@/components/Images/metaicon.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const MetaFramework = ({ cmsContent }) => {
  const iconSrc = MetaIcon?.src || MetaIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "metaframework");

  const defaultHeading = "Connecting People and Building the Future";
  const defaultParagraph =
    "Meta is a leading technology company dedicated to connecting people through its powerful social platforms while spearheading innovations in virtual reality (VR), augmented reality (AR), and the emerging metaverse. By offering seamless ways for users and businesses to interact, share experiences, and build communities, Meta is transforming how people connect across digital landscapes. Its platforms not only foster social connections but also enable businesses to engage with audiences more effectively.";
  const defaultButton = "Key Features";

  const heading = getCmsVal(cmsContent, defaultHeading, "metaframework");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "metaframework");
  const buttonText = getCmsVal(cmsContent, defaultButton, "metaframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Meta?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Meta Icon"
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

export default MetaFramework;
