"use client";
import React from "react";
import WhyChoose, { icons } from "@/app/_components/services/eCommerce-developement/WhyChoose/WhyChoose";

const appWhyChooseData = [
  {
    title: "Expert App Developers",
    desc: "As one of the top app development companies, our team of skilled mobile app developers, UX/UI designers and software engineers brings deep expertise in creating high-performance iOS and Android apps. We follow best coding practices and leverage the latest technologies to deliver secure, reliable and user-friendly applications.",
    icon: icons[0]
  },
  {
    title: "Custom Digital Solutions",
    desc: "Every business is unique and so is our approach to app development. We create tailored mobile applications that perfectly align with your business goals, target audience and platform requirements.",
    icon: icons[1]
  },
  {
    title: "Fast & Agile Delivery",
    desc: "We follow an agile app development process that allows us to deliver projects quickly while maintaining high quality, performance and flexibility throughout development.",
    icon: icons[2]
  },
  {
    title: "Affordable & Transparent Pricing",
    desc: "We offer top-quality mobile app development services in UAE at clear and competitive rates. No hidden costs, just transparent pricing so you can confidently invest in building your mobile app.",
    icon: icons[3]
  },
  {
    title: "24/7 Ongoing Support",
    desc: "Our support doesn't end after your app launches. We provide continuous maintenance, updates and technical assistance to ensure your app runs smoothly, stays secure and keeps users engaged.",
    icon: icons[4]
  },
  {
    title: "Proven Growth Results",
    desc: "Our custom app solutions are designed not just to function flawlessly, but to optimize business operations, increase productivity and drive measurable, long-term growth.",
    icon: icons[5]
  }
];

const AppWhyChoose = () => {
  return <WhyChoose items={appWhyChooseData} />;
};

export default AppWhyChoose;
