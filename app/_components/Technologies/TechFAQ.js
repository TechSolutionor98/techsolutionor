import React from 'react'
import FAQs from '../../../components/Faq/Faq'

const faqstechquestion = [
        {
            question: "Which technologies are best for building scalable web applications?",
            answer: "Technologies like Angular, React, Laravel, PHP, and .NET are ideal for scalable and high-performance web applications. We provide development services tailored to business requirements, ensuring security, speed, and maintainability."
        },
        {
            question: "How do HTML, CSS, and JavaScript work together in web development?",
            answer: "HTML structures content, CSS styles it, and JavaScript adds interactivity. Together, they form the foundation for responsive, user-friendly, and SEO-optimized websites compatible across all devices."
        },
        {
            question: "What is the best programming language for iOS and macOS apps?",
            answer: "Swift is the preferred language for developing iOS, macOS, watchOS, and tvOS applications. Our Swift development services ensure high-performance, secure, and scalable apps with seamless user experiences."
        },
        {
            question: "Why choose Angular or React for modern web applications?",
            answer: "Angular and React enable the creation of dynamic, single-page applications (SPAs) with fast performance. Our development services deliver maintainable, interactive, and enterprise-ready web solutions."
        },
        {
            question: "What backend technologies do you use for enterprise applications?",
            answer: "We use Laravel, PHP, Python, Go, and .NET to build robust backend systems. These technologies ensure scalable APIs, secure data handling, and high-performance applications for modern businesses."
        },
        {
            question: "Which platforms are best for eCommerce development?",
            answer: "Magento, Shopify, and WordPress are ideal for building flexible and scalable online stores. We offer custom eCommerce development services for high-performance, conversion-focused websites."
        },
        {
            question: "How can Flutter or React Native help in mobile app development?",
            answer: "Flutter and React Native allow cross-platform mobile apps with native-like performance. Our development services help create smooth, responsive, and scalable mobile solutions from a single codebase."
        },
        {
            question: "What tools do you use for UI/UX design and analytics?",
            answer: "We use Figma for collaborative UI/UX design and Analytics tools for tracking user behavior, performance, and conversion optimization, ensuring data-driven and visually appealing digital products."
        },
        {
            question: "How can Google Ads help grow my business online?",
            answer: "Google Ads enables targeted advertising campaigns to reach relevant audiences, increase traffic, and boost conversions. Our services include strategy, campaign management, and ROI optimization for maximum impact."
        },
        {
            question: "How do you ensure technology solutions are secure and high-performing?",
            answer: "We follow best practices for coding, architecture, and testing across all technologies (C++, Go, Python, PHP, .NET, etc.) to deliver secure, scalable, and high-performance solutions tailored to business needs."
        }
    ]

  export default function faqspagetech() {
  return <FAQs title="Frequently Asked Questions (FAQs)" faqs={faqstechquestion} />;
}
