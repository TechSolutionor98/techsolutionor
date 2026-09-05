"use client";
import React from 'react';
import PythonIcon from '@/components/Images/pythonicon.webp';
import { getCmsVal } from '@/lib/api-helper';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const PythonFramework = ({ cmsContent }) => {
  const iconSrc = PythonIcon?.src || PythonIcon;
  const logoUrl = getCmsVal(cmsContent, iconSrc, "pythonframework");

  const heading = getCmsVal(cmsContent, "Versatile and Powerful Programming Language", "pythonframework");
  const paragraph = getCmsVal(
    cmsContent,
    "Python is a high-level, interpreted programming language known for its readability, simplicity, and versatility. Created by Guido van Rossum and first released in 1991, Python has grown to become one of the most popular languages in the world, used in a wide range of applications from web development and data analysis to machine learning and automation.",
    "pythonframework"
  );
  const buttonText = getCmsVal(cmsContent, "Key Features", "pythonframework");

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="Python?"
      leadText={heading}
      paragraph={paragraph}
      image={logoUrl}
      imageAlt="Python Icon"
      imageFit="contain"
      hiddenContent={
        <>
          <h1>Versatile and Powerful Programming Language</h1>
          <p>Python is a high-level, interpreted programming language known for its readability, simplicity, and versatility. Created by Guido van Rossum and first released in 1991, Python has grown to become one of the most popular languages in the world, used in a wide range of applications from web development and data analysis to machine learning and automation.</p>
          <button>{buttonText || "Key Features"}</button>
        </>
      }
    />
  );
};

export default PythonFramework;
