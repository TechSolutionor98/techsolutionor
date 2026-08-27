"use client";
import React from "react";
import WhyChoose, { icons } from "@/app/_components/services/eCommerce-developement/WhyChoose/WhyChoose";

const webWhyChooseData = [
  {
    title: "Expert Developers",
    desc: "Our team of skilled website developers, designers and UX specialists brings deep expertise in creating responsive, modern websites. We follow best coding practices and use the latest frameworks to deliver fast, secure and reliable web solutions.",
    icon: icons[0]
  },
  {
    title: "Custom Digital Solutions",
    desc: "Every business is unique and so is our website design and development. As a leading website design company, we create fully customized websites and web applications that align perfectly with your brand, business goals and target audience.",
    icon: icons[1]
  },
  {
    title: "Fast & Agile Delivery",
    desc: "We follow an agile web development process that enables us to deliver projects quickly while maintaining top-notch quality, functionality and responsiveness.",
    icon: icons[2]
  },
  {
    title: "Affordable & Transparent Pricing",
    desc: "We offer high quality web development services at competitive and transparent rates. No hidden fees, just clear pricing so you can confidently invest in building a professional website for your business.",
    icon: icons[3]
  },
  {
    title: "24/7 Ongoing Support",
    desc: "Our support doesn't stop after launch. We provide continuous website maintenance, updates and troubleshooting to ensure your site runs smoothly and stays secure 24/7.",
    icon: icons[4]
  },
  {
    title: "Proven Growth Results",
    desc: "Our custom web solutions are designed not just to look great, but to streamline operations, enhance user experience and drive measurable growth for your business.",
    icon: icons[5]
  }
];

const WebWhyChoose = () => {
  return <WhyChoose items={webWhyChooseData} />;
};

export default WebWhyChoose;
