"use client";
import React from "react";
import Faq from "@/components/Faq/Faq";

const webFaqs = [
  {
    question: "What types of web development services do you offer in Dubai?",
    answer: "We provide full-stack web development services in Dubai and across the UAE, including custom website development, responsive design, CMS development (WordPress, Drupal), eCommerce sites, web application development, API integration and maintenance services tailored to your business needs."
  },
  {
    question: "Do you build responsive and mobile‑friendly websites?",
    answer: "Yes, all our websites are fully responsive and mobile-friendly, ensuring seamless performance and optimal user experience across desktops, laptops, tablets, and smartphones."
  },
  {
    question: "Which technologies do you use for web development?",
    answer: "We utilize modern, industry-leading technologies including HTML5, CSS3, JavaScript, React.js, Next.js, Node.js, PHP, Python, WordPress, WooCommerce, and custom web frameworks."
  },
  {
    question: "Can you redesign an existing website?",
    answer: "Yes, we specialize in complete website redesigns. We modernize outdated designs, improve user experience, enhance page loading speeds, and implement updated SEO best practices to boost conversions."
  },
  {
    question: "How long does it take to develop a website?",
    answer: "Timelines vary depending on project scope. A standard corporate website typically takes 4 to 6 weeks, while complex eCommerce platforms or custom web applications take 8 to 12 weeks."
  },
  {
    question: "Will my website be optimized for SEO?",
    answer: "Yes, all our websites are built with SEO best practices from the ground up, including semantic HTML structure, clean code, fast page load speeds, mobile optimization, and meta tag architecture."
  },
  {
    question: "Do you provide eCommerce web development?",
    answer: "Yes, we build scalable, secure eCommerce platforms with custom shopping carts, inventory management, payment gateway integration, and high-converting checkout flows."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we provide 24/7 post-launch maintenance, security monitoring, regular updates, bug fixes, performance optimization, and content updates."
  },
  {
    question: "Can you integrate third‑party systems like CRM, ERP or payment gateways?",
    answer: "Yes, we seamlessly integrate third-party APIs, CRM platforms, ERP systems, analytics tools, and local/global payment gateways like Stripe, PayPal, Telr, and Checkout.com."
  },
  {
    question: "How much does web development cost?",
    answer: "Web development costs depend on feature complexity, design requirements, and integrations. Contact us today for a free consultation and customized quote for your project."
  }
];

export default function WebFAQ() {
  return <Faq title="Frequently Asked Questions (FAQs)" faqs={webFaqs} />;
}
