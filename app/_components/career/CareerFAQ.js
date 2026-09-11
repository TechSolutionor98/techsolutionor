"use client";

import React from "react";
import FAQs from "@/components/Faq/Faq";

const careerFaqs = [
  {
    question: "How can I apply for a position?",
    answer: "You can apply directly using our online job application form above. Select the position you wish to apply for, fill in your contact information, specify your experience level, attach a brief cover letter or introductory message, and upload your resume/CV in PDF, DOC, or DOCX format."
  },
  {
    question: "What information do I need to submit with my application?",
    answer: "We require your full name, email address, telephone number, targeted position, years of relevant experience, a cover letter (minimum 20 characters), and your resume/CV. You can also optionally include links to your portfolio, GitHub, or LinkedIn profile."
  },
  {
    question: "Can I apply if there is no suitable open position?",
    answer: "Yes! You can choose 'General Application / Other Roles' in the position dropdown. Our talent acquisition team reviews all incoming applications and will reach out when an opening matches your skill set and career aspirations."
  },
  {
    question: "What happens after I submit my application?",
    answer: "Once submitted, your application is logged in our dedicated recruitment portal and reviewed by our hiring managers. If your profile matches our requirements, our talent team will contact you to schedule an initial conversation."
  },
  {
    question: "How will I know if my application is approved or rejected?",
    answer: "You will receive an email notification directly at the email address provided in your application. Whenever an application status is updated (approved for an interview or retained in our talent database), you will receive a transparent status update with next steps."
  },
  {
    question: "Can I update my application after submitting it?",
    answer: "Yes. If you need to update your contact details, attach an updated resume, or provide new portfolio links, you can submit a new application through the form or reply directly to the confirmation email from our recruitment team."
  },
  {
    question: "What type of roles and opportunities are available?",
    answer: "We hire across Full-Stack, Mobile, Frontend, and Backend Engineering, UI/UX Product Design, DevOps & Cloud Architecture, Digital Growth, and Quality Assurance. We offer remote and hybrid opportunities with flexible working arrangements."
  },
  {
    question: "What resume/CV file formats and size limits are accepted?",
    answer: "We accept PDF (.pdf), Microsoft Word (.doc, and .docx) files up to a maximum size of 10MB. Please ensure your CV is clean, readable, and highlights your key technical contributions and achievements."
  },
  {
    question: "How long does the hiring process usually take?",
    answer: "Our standard recruitment process usually takes 1 to 2 weeks, including initial screening, technical/portfolio walkthrough with team leads, and a culture alignment conversation. We keep the process agile, transparent, and respectful of your time."
  },
  {
    question: "Do you offer remote work flexibility and equipment?",
    answer: "Yes! We foster a remote-first culture with flexible working hours, asynchronous communication, modern equipment setups (including latest Apple Silicon MacBooks), and continuous learning sponsorships."
  }
];

export default function CareerFAQ() {
  return <FAQs title="Frequently Asked Questions (FAQs)" faqs={careerFaqs} />;
}
