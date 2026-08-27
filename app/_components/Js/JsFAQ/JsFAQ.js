"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";

const jsFaqs = [
  {
    question: "What is React JS used for?",
    answer: "React JS is used to build dynamic and responsive user interfaces for web applications, allowing developers to create interactive and component-based UI elements efficiently."
  },
  {
    question: "Why should I choose React for web development?",
    answer: "React offers fast rendering through its Virtual DOM, reusable component architecture, strong ecosystem, and wide community support, making it ideal for modern web development."
  },
  {
    question: "What is the Virtual DOM in React?",
    answer: "The Virtual DOM is a lightweight copy of the actual DOM. React uses it to calculate minimal UI updates, improving rendering performance and overall application speed."
  },
  {
    question: "What are React Hooks?",
    answer: "React Hooks are functions that let developers use state and lifecycle features inside functional components, making code cleaner and easier to maintain."
  },
  {
    question: "Is React suitable for large-scale applications?",
    answer: "Yes, React's component-based structure, modularity, state management tools (like Redux or Context API), and strong ecosystem make it highly suitable for enterprise-level applications."
  },
  {
    question: "Can React be used with other libraries or frameworks?",
    answer: "Yes, React can be seamlessly integrated with backend technologies like Node.js, Express, Laravel, Python, and frontend tools like Redux, Next.js, and Tailwind CSS."
  },
  {
    question: "Is React only for web development?",
    answer: "No, React can also be used for mobile app development through React Native, allowing developers to build cross-platform iOS and Android applications."
  },
  {
    question: "Does React have a strong community?",
    answer: "Yes, React is backed by Meta and has one of the largest global developer communities, offering continuous updates, extensive documentation, and thousands of third-party libraries."
  }
];

export default function JsFAQ() {
  return <Faq title="Frequently Asked Questions (FAQs)" faqs={jsFaqs} />;
}
