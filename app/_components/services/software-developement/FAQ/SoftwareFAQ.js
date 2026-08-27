"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";

const softwareFaqs = [
  {
    question: "What types of software development services do you offer?",
    answer: "We provide full‑cycle software development services including custom business applications, enterprise systems, SaaS platforms, mobile apps, API integrations and scalable solutions tailored to your industry requirements."
  },
  {
    question: "What technologies do you use for software development?",
    answer: "We work with modern backend, frontend, database and cloud technologies including Java/Spring Boot, Python/Django, .NET/C#, Node.js/Express, PHP/Laravel, React JS, Angular, SQL, NoSQL and major cloud platforms."
  },
  {
    question: "How long does it take to build custom software?",
    answer: "Timelines depend on project complexity, scope and features. Standard business applications take 4 to 8 weeks, while complex enterprise platforms may take 12 weeks or more."
  },
  {
    question: "Do you provide software maintenance and support?",
    answer: "Yes, we offer ongoing 24/7 technical support, regular updates, bug fixes, security patches and performance optimization to keep your software running efficiently."
  },
  {
    question: "How do you ensure quality and security in software solutions?",
    answer: "We follow strict QA testing protocols, automated code reviews, encrypted data storage, role-based access control and industry-standard security compliance."
  },
  {
    question: "Can you integrate custom software with existing systems?",
    answer: "Yes, we specialize in building custom APIs and integrating third-party software, CRMs, ERPs and legacy IT infrastructure for smooth data flow."
  },
  {
    question: "Will my software be scalable for future growth?",
    answer: "Absolutely. We design modular, cloud-ready software architecture that scales seamlessly as your user base, transaction volume and business operations expand."
  },
  {
    question: "Do you develop mobile applications as part of software services?",
    answer: "Yes, we develop native (iOS/Android) and cross-platform mobile applications that seamlessly connect with your custom backend software."
  },
  {
    question: "How much does custom software development cost?",
    answer: "Development costs depend on project scope, features, tech stack and timeline. Contact our team for a free, detailed project estimation tailored to your budget."
  },
  {
    question: "Can you build industry‑specific software (e.g., healthcare, finance, logistics)?",
    answer: "Yes, we have deep experience engineering custom software for diverse industries including healthcare, real estate, finance, e-commerce, logistics and corporate enterprises in Dubai and globally."
  }
];

export default function SoftwareFAQ() {
  return <Faq title="Frequently Asked Questions (FAQs)" faqs={softwareFaqs} />;
}
