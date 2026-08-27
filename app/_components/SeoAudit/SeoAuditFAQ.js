"use client"
import React, { useState } from 'react'
import SeoAuditFAQ from '../../../components/Faq/Faq'

    const faqsseoauditquestions = [
        {
            question: "What is included in a free SEO audit?",
            answer: "Our comprehensive SEO audit covers on-page optimization, technical SEO issues, backlink analysis, keyword ranking opportunities, and competitor insights to provide a complete overview of your website performance."
        },
        {
            question: "Is the SEO audit really free?",
            answer: "Yes! We offer a 100% free, no-obligation SEO audit to help businesses understand their current performance and identify growth opportunities."
        },
        {
            question: "How long does it take to receive the SEO audit report?",
            answer: "Typically, you will receive your custom audit report within 24–48 hours after submitting your request."
        },
        {
            question: "Can you audit websites targeting Dubai or UAE specifically?",
            answer: "Absolutely. We specialize in local SEO for Dubai and the UAE, ensuring your website is optimized for the region’s specific search behavior."
        },
        {
            question: "Will this audit help increase my website traffic?",
            answer: "Yes. The audit identifies technical issues, keyword gaps, and on-page improvements that, when fixed, directly contribute to higher rankings and more traffic."
        },
        {
            question: "Do I need ongoing SEO services after the audit?",
            answer: "The audit provides recommendations you can implement yourself. However, if you want expert execution and faster growth, our team can manage your SEO strategy for long-term results."
        }
    ];

       export default function faqspagecontent() {
  return <SeoAuditFAQ title="Frequently Asked Questions (FAQs)" faqs={faqsseoauditquestions} />;
}
