"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";

const appFaqs = [
  {
    question: "What types of mobile app development services do you offer in Dubai?",
    answer: "We develop custom mobile applications for iOS, Android and cross-platform environments for clients across Dubai and the UAE. Our services include native apps, hybrid apps, ecommerce apps and progressive web apps, tailored to your business goals and user needs."
  },
  {
    question: "How long does it take to build a mobile app?",
    answer: "The timeline for building a mobile app depends on its complexity, feature set, design requirements and target platforms. Simple apps typically take 6 to 10 weeks, while complex enterprise applications with custom integrations can take 3 to 6 months."
  },
  {
    question: "Which technologies do you use for app development?",
    answer: "We use modern, industry-standard frameworks and programming languages including Swift, Objective-C and Xcode for iOS; Java, Kotlin and Android Studio for Android; and Flutter and React Native for cross-platform app development."
  },
  {
    question: "Do you provide app design services?",
    answer: "Yes, we provide end-to-end UI/UX design services. Our team creates wireframes, interactive prototypes and intuitive user interfaces designed to offer engaging and seamless user experiences across mobile devices."
  },
  {
    question: "Will my app be optimized for different devices?",
    answer: "Absolutely. All our mobile applications are fully responsive and optimized to perform smoothly across smartphones, tablets and different screen resolutions."
  },
  {
    question: "Do you handle app deployment and publishing?",
    answer: "Yes, we manage the entire publishing process for both the Apple App Store and Google Play Store, ensuring full compliance with store guidelines and policies."
  },
  {
    question: "How do you ensure app security and quality?",
    answer: "We implement rigorous testing protocols including functional, performance, security and usability testing. We also apply secure coding practices, data encryption and compliance measures to safeguard your app."
  },
  {
    question: "Can you integrate the app with existing systems or databases?",
    answer: "Yes, we can seamlessly connect your mobile app with CRM systems, ERP platforms, payment gateways, third-party APIs and custom databases."
  },
  {
    question: "Do you offer app maintenance and support?",
    answer: "Yes, we offer 24/7 post-launch maintenance, performance monitoring, OS compatibility updates, bug fixes and feature enhancements."
  },
  {
    question: "How much does mobile app development cost?",
    answer: "Mobile app development costs vary depending on features, platforms, design complexity and third-party integrations. Contact us today for a free consultation and customized quote for your project."
  }
];

export default function AppFAQ() {
  return <Faq title="Frequently Asked Questions (FAQs)" faqs={appFaqs} />;
}
