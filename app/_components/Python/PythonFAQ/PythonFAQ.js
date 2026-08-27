"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const pythonFaqsDefault = [
  {
    question: "What is Python used for?",
    answer: "Python is used for web development, data analysis, artificial intelligence, machine learning, automation, and software development, making it a versatile and widely-adopted programming language."
  },
  {
    question: "Why is Python so popular?",
    answer: "Python is popular due to its simple and readable syntax, extensive standard libraries, strong community support, and wide range of applications from web apps to AI and data science."
  },
  {
    question: "Is Python suitable for beginners?",
    answer: "Yes, Python is considered one of the best programming languages for beginners because of its clean syntax, which closely resembles natural English, making it easy to learn and write."
  },
  {
    question: "Can Python be used for web development?",
    answer: "Yes, Python is widely used for web development using powerful frameworks like Django, Flask, FastAPI, and Pyramid to build secure, scalable, and high-performance web applications."
  },
  {
    question: "Is Python good for data science and AI?",
    answer: "Yes, Python is the industry standard language for data science, machine learning, and AI, powered by libraries such as NumPy, Pandas, TensorFlow, PyTorch, and Scikit-Learn."
  },
  {
    question: "Does Python support automation?",
    answer: "Yes, Python is widely used for automating repetitive tasks, web scraping, task scheduling, system administration, and workflow automation efficiently."
  },
  {
    question: "Is Python fast and high-performance?",
    answer: "While Python is an interpreted language, its performance can be optimized using C extensions, asynchronous programming, JIT compilers (like PyPy), and high-performance libraries."
  },
  {
    question: "Can Python integrate with other technologies?",
    answer: "Yes, Python seamlessly integrates with C/C++, Java, .NET, databases, REST/GraphQL APIs, and cloud services, making it easy to incorporate into existing tech stacks."
  }
];

export default function PythonFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "pythonfaq");

  const faqs = pythonFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "pythonfaq"),
    answer: getCmsVal(cmsContent, item.answer, "pythonfaq"),
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
