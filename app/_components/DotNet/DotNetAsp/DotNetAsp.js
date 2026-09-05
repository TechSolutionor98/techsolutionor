"use client";
import React from 'react';
import DotNetIcon from '@/components/Images/dotnet.png';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const defaultBullets = [
  "Modern, high-performing applications for both local and global markets",
  "Secure and scalable software architecture",
  "Cost-effective development with faster time-to-market",
  "Continuous support and future-ready solutions"
];

const DotNetAsp = ({ cmsContent }) => {
  const iconSrc = DotNetIcon?.src || DotNetIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "dotnetasp");

  const defaultHeading = "Why Choose .NET for Your Business?";
  const defaultParagraph =
    ".NET is a versatile and powerful framework widely used for building web, desktop, and mobile applications. With cross-platform capabilities, seamless integration, and robust security features, .NET ensures your applications perform efficiently at scale. By choosing our .NET development services, you benefit from:";

  const heading = getCmsVal(cmsContent, defaultHeading, "dotnetasp");
  const paragraph = getCmsVal(cmsContent, defaultParagraph, "dotnetasp");
  const bullets = defaultBullets.map(b => getCmsVal(cmsContent, b, "dotnetasp"));

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest=".NET for Your Business?"
      paragraph={paragraph}
      bullets={bullets}
      image={logoUrl}
      imageAlt=".NET Icon"
      imageFit="contain"
      hiddenContent={
        <>
          <h2>{heading}</h2>
          <p>{paragraph}</p>
          <ul>
            {bullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </>
      }
    />
  );
};

export default DotNetAsp;
