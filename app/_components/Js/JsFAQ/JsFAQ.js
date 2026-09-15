"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const defaultJsFaqs = [
  {
    question: "What is JavaScript used for?",
    answer: "JavaScript is used to create interactive, dynamic web applications, mobile apps, backend microservices via Node.js, and browser APIs."
  },
  {
    question: "Why should I choose JavaScript for web development?",
    answer: "JavaScript is supported natively by all web browsers, has the world's largest package ecosystem (npm), and powers both frontend and backend development."
  },
  {
    question: "What is the difference between JavaScript and TypeScript?",
    answer: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript, adding static type checking and enterprise-grade tooling."
  },
  {
    question: "Can JavaScript be used on the server?",
    answer: "Yes, Node.js and Bun allow JavaScript to execute on the server, handling high concurrency I/O operations and microservice APIs efficiently."
  },
  {
    question: "Is JavaScript suitable for large-scale enterprise applications?",
    answer: "Yes, modern JavaScript frameworks and modular architectures enable large teams to build scalable, high-performance web applications."
  },
  {
    question: "How does asynchronous programming work in JavaScript?",
    answer: "JavaScript handles asynchronous tasks using the Event Loop, Promises, and async/await syntax, preventing thread blockage during network requests or file operations."
  },
  {
    question: "Can JavaScript be used for mobile apps?",
    answer: "Yes, frameworks like React Native and Ionic allow developers to build cross-platform native mobile applications using JavaScript."
  },
  {
    question: "Does JavaScript have strong community support?",
    answer: "JavaScript has the most active developer ecosystem worldwide, with millions of open-source packages, continuous ECMAScript updates, and robust community documentation."
  }
];

export default function JsFAQ({ cmsContent }) {
  const title = getCmsVal(cmsContent, "Frequently Asked Questions (FAQs)", "jsfaq");
  const faqs = defaultJsFaqs.map((faq) => ({
    question: getCmsVal(cmsContent, faq.question, "jsfaq"),
    answer: getCmsVal(cmsContent, faq.answer, "jsfaq"),
  }));

  return <Faq title={title} faqs={faqs} />;
}
