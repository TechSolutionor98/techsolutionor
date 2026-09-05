"use client";
import React from "react";
import JsIcon from "@/components/Images/jsicon_3d.png";
import WhyChoose from "@/components/WhyChoose/WhyChoose";

const JsFramework = () => {
  const heading = "The Backbone of Modern Web Development";
  const paragraph =
    "JavaScript is a powerful and versatile programming language that drives the dynamic and interactive behavior of modern websites and applications. As a core technology of web development, JavaScript enables responsive designs, real-time updates, and seamless user experiences across all devices and platforms.";

  return (
    <WhyChoose
      highlightText="Why Choose"
      titleRest="JavaScript?"
      leadText={heading}
      paragraph={paragraph}
      image={JsIcon}
      imageAlt="JavaScript Icon"
      imageFit="contain"
      hiddenContent={
        <>
          <h1>{heading}</h1>
          <p>{paragraph}</p>
        </>
      }
    />
  );
};

export default JsFramework;
