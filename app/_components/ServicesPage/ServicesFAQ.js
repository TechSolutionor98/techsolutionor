"use client"
import React, { useState } from 'react'
import FAQs from '../../../components/Faq/Faq'


    const faqsservicesquestion = [
        {
            question: "What services does Tech Solutionor offer?",
            answer: "We provide a full range of digital solutions including web development, software development, app development, e-commerce sites, graphics design, social media management, digital marketing, SEO, PPC & Amazon advertising, content writing, and call center support to grow your business locally and worldwide."
        },
        {
            question: "How long does it take to build a website or app?",
            answer: "The timeline depends on the complexity of the project. A simple website might take 2-4 weeks, while complex enterprise platforms or mobile apps can take 2-6 months. We provide detailed timelines after the initial strategy phase."
        },
        {
            question: "Will my website or app be mobile‑friendly and SEO‑optimized?",
            answer: "Yes, absolutely. All our web and mobile products are built with a mobile-first approach and follow SEO best practices to ensure they perform well in search results and provide a great user experience on all devices."
        },
        {
            question: "Do you provide ongoing support after launch?",
            answer: "Yes, we offer various maintenance and support plans to ensure your digital products remain secure, up-to-date, and continue to perform optimally as your business grows."
        },
        {
            question: "What results can I expect from digital marketing and PPC?",
            answer: "We focus on data-driven results, including increased traffic, higher lead conversion rates, and improved ROI. We provide regular reports to track progress against your business goals."
        },
        {
            question: "Can you handle Amazon advertising and PPC campaigns?",
            answer: "Yes, we have specialized experts who manage Amazon advertising and broad PPC campaigns across Google Ads, Meta, and other platforms to maximize your marketplace visibility."
        },
        {
            question: "How do you determine pricing for services?",
            answer: "Pricing is based on the scope of work, project complexity, and resources required. We offer competitive pricing models tailored to both small businesses and large enterprises."
        }
    ];

   export default function faqspageservices() {
  return <FAQs title="Frequently Asked Questions (FAQs)" faqs={faqsservicesquestion} />;
}

    
