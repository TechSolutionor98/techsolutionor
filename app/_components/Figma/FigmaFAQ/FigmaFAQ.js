"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const figmaFaqsDefault = [
  {
    question: "What is Figma used for?",
    answer: "Figma is a cloud-based design tool used for creating UI/UX designs, wireframes, and interactive prototypes, enabling teams to collaborate in real-time."
  },
  {
    question: "Can multiple people work on Figma at the same time?",
    answer: "Yes, Figma supports real-time multiplayer editing, allowing multiple designers, developers, and product managers to work together simultaneously."
  },
  {
    question: "Is Figma only for web design?",
    answer: "No, Figma is widely used for mobile app UI/UX, desktop interfaces, design systems, vector graphics, social media assets, and interactive wireframes."
  },
  {
    question: "Does Figma require installation?",
    answer: "No, Figma runs directly in web browsers without installation, though desktop applications for macOS and Windows are also available."
  },
  {
    question: "Can Figma handle large teams and projects?",
    answer: "Yes, Figma offers team workspaces, version history, component libraries, and enterprise permission controls to easily scale across large organizations."
  },
  {
    question: "Does Figma include prototyping tools?",
    answer: "Yes, Figma includes built-in interactive prototyping features with smart animations, device frames, transitions, and click-through user flows."
  }
];

export default function FigmaFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "figmafaq");

  const faqs = figmaFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "figmafaq"),
    answer: getCmsVal(cmsContent, item.answer, "figmafaq"),
  }));

  return (
    <div>
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
      <Faq title={sectionTitle} faqs={faqs} />
    </div>
  );
}
