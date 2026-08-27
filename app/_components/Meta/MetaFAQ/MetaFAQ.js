"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const metaFaqsDefault = [
  {
    question: "What is Meta?",
    answer: "Meta is a technology company that connects people through social platforms like Facebook, Instagram, and WhatsApp while innovating in virtual reality (VR), augmented reality (AR), and the metaverse."
  },
  {
    question: "Which platforms does Meta own?",
    answer: "Meta owns and operates major global digital platforms including Facebook, Instagram, WhatsApp, Messenger, Threads, and Meta Quest (Oculus)."
  },
  {
    question: "What is Meta doing in the metaverse?",
    answer: "Meta develops immersive hardware and software environments like Meta Horizon Workrooms and Meta Quest to pioneer 3D digital experiences and virtual workspaces."
  },
  {
    question: "How does Meta help businesses?",
    answer: "Meta provides targeted advertising algorithms, Meta Business Suite, shop integrations, custom analytics, and customer communication tools to drive sales and engagement."
  },
  {
    question: "Is Meta only about social media?",
    answer: "No, Meta is an advanced technology company investing heavily in artificial intelligence (LLaMA), VR/AR hardware, spatial computing, and digital commerce ecosystems."
  },
  {
    question: "Can content creators benefit from Meta?",
    answer: "Yes, Meta offers monetization tools, subscription models, creator funds, and analytics to help creators build and monetize their audiences."
  }
];

export default function MetaFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "metafaq");

  const faqs = metaFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "metafaq"),
    answer: getCmsVal(cmsContent, item.answer, "metafaq"),
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
