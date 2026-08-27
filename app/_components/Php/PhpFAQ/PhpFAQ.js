"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";
import { getCmsVal } from "@/lib/api-helper";

const phpFaqsDefault = [
  {
    question: "What is PHP used for?",
    answer: "PHP is used for server-side web development, powering dynamic websites, web applications, and content management systems like WordPress, Drupal, and Joomla."
  },
  {
    question: "Why should I use PHP for web development?",
    answer: "PHP is mature, flexible, cost-effective, and backed by a vast ecosystem of frameworks and CMS platforms suitable for projects of all sizes."
  },
  {
    question: "Is PHP beginner-friendly?",
    answer: "Yes, PHP has a low barrier to entry with simple syntax, quick setup, extensive documentation, and a friendly global community."
  },
  {
    question: "What are popular PHP frameworks?",
    answer: "Popular PHP frameworks include Laravel, Symfony, CodeIgniter, CakePHP, and Yii, offering MVC architecture and pre-built tools for rapid development."
  },
  {
    question: "Is PHP compatible with all web servers?",
    answer: "Yes, PHP runs on virtually all major web servers including Apache, Nginx, IIS, and Lighttpd across Windows, Linux, and macOS."
  },
  {
    question: "Is PHP free to use?",
    answer: "Yes, PHP is open-source under the PHP License, free to download, use, and deploy without licensing costs."
  },
  {
    question: "Can PHP handle large-scale applications?",
    answer: "Yes, enterprise platforms like Facebook, Wikipedia, and Slack utilize PHP and modern JIT compilation for high-traffic scalability."
  },
  {
    question: "Does PHP have strong community support?",
    answer: "Yes, PHP has one of the largest developer communities in the world with millions of open-source packages available via Composer."
  }
];

export default function PhpFAQ({ cmsContent }) {
  const defaultTitle = "Frequently Asked Questions (FAQs)";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "phpfaq");

  const faqs = phpFaqsDefault.map((item) => ({
    question: getCmsVal(cmsContent, item.question, "phpfaq"),
    answer: getCmsVal(cmsContent, item.answer, "phpfaq"),
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
