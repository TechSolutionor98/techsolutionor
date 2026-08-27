"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const angularFaqsDefault = [
  {
    question: "What is AngularJS and how does it work?",
    answer: "AngularJS is an open‑source JavaScript framework developed by Google for building dynamic, single‑page web applications (SPAs). It extends HTML with special attributes and synchronizes the data between the model and view in real time using two‑way data binding."
  },
  {
    question: "What are the key features of AngularJS?",
    answer: "Key features include two-way data binding, MVC architecture, custom directives, dependency injection, routing, and built-in form validation capabilities."
  },
  {
    question: "What is two way data binding in AngularJS?",
    answer: "Two-way data binding automatically syncs changes between the application UI (View) and the underlying data store (Model) without writing manual event handlers."
  },
  {
    question: "How does AngularJS differ from Angular (2+)?",
    answer: "AngularJS is based on JavaScript and MVC patterns with scope architecture, whereas Angular (2+) is built on TypeScript, component-based design, and improved performance standards."
  },
  {
    question: "What is dependency injection in AngularJS?",
    answer: "Dependency injection is a design pattern where dependencies (services or data) are injected into components automatically rather than instantiated manually within them."
  },
  {
    question: "Is AngularJS still used in modern web development?",
    answer: "While legacy enterprise applications still run on AngularJS, modern web development generally favors updated framework versions like Angular 17+ or React."
  },
  {
    question: "What makes AngularJS good for single page applications (SPAs)?",
    answer: "AngularJS dynamically rewrites the current web page rather than loading entire new pages from a server, producing fluid user experiences and minimal network overhead."
  },
  {
    question: "Can AngularJS be used for large enterprise applications?",
    answer: "Yes, AngularJS offers structured MVC patterns, modular service architecture, and dependency injection, making it scalable for large enterprise codebases."
  },
  {
    question: "How easy is it to learn AngularJS?",
    answer: "AngularJS has an accessible learning curve for developers familiar with basic HTML, CSS, and vanilla JavaScript concepts."
  }
];

export default function AngularFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "angularfaq");

  const faqs = angularFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "angularfaq"),
    answer: getCmsVal(cmsContent, item.answer, "angularfaq"),
  }));

  return (
    <div>
      <div className="hidden">
        <h2>{defaultTitle}</h2>
        {angularFaqsDefault.map((item, idx) => (
          <div key={idx}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
      <Faq title={sectionTitle} faqs={faqs} />
    </div>
  );
}
