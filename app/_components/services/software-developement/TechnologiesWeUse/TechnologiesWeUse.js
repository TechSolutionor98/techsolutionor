"use client";

import React from "react";

const techData = [
  {
    title: "Java / Spring Boot",
    desc: "Enterprise-grade backend development for scalable, secure and high-performance business applications with robust architecture and long-term system reliability."
  },
  {
    title: "Python / Django",
    desc: "Powerful backend solutions enabling rapid development, clean code structure and scalable web applications for modern business environments."
  },
  {
    title: ".NET / C#",
    desc: "Robust Microsoft-based framework delivering secure, high-performance enterprise software, custom business systems and scalable application solutions."
  },
  {
    title: "Node JS / Express",
    desc: "Fast, event-driven backend development ideal for real-time applications, APIs and scalable cloud-based software systems."
  },
  {
    title: "PHP / Laravel",
    desc: "Flexible web application framework providing structured development, secure architecture and scalable custom business software solutions."
  },
  {
    title: "React JS",
    desc: "Modern frontend library for building responsive, interactive and high-performance user interfaces across web applications."
  },
  {
    title: "Angular",
    desc: "Structured frontend framework for developing dynamic, scalable and enterprise-ready single-page web applications."
  },
  {
    title: "SQL / NoSQL",
    desc: "Reliable database solutions ensuring secure data storage, optimized performance and scalable information management systems."
  },
  {
    title: "Cloud Platforms",
    desc: "Scalable cloud infrastructure solutions enabling secure deployment, flexible resources and high-availability application performance."
  }
];

const TechnologiesWeUse = () => {
  return (
    <section className="w-full bg-[#1e1e1e] py-14 md:py-18 font-sans text-white">
      <div className="max-w-[1140px] mx-auto px-5">
        {/* SUBTITLE & MAIN HEADING */}
        <div className="mb-8 md:mb-10">
          <p className="text-[#41b349] font-bold text-[18px] sm:text-[20px] mb-1">
            We Are Best
          </p>
          <h2 className="text-[28px] sm:text-[36px] md:text-[40px] font-extrabold text-white tracking-tight leading-tight">
            Technologies We Use
          </h2>
        </div>

        {/* 3x3 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {techData.map((tech, idx) => (
            <div
              key={idx}
              className="bg-[#111111] border border-white/20 rounded-[18px] p-6 sm:p-7 text-center flex flex-col justify-start items-center h-full min-h-[220px] shadow-lg hover:border-[#41b349] transition-all duration-300"
            >
              <h3 className="text-white font-bold text-[18px] sm:text-[20px] mb-4 leading-snug">
                {tech.title}
              </h3>
              <p className="text-[#a6a6a6] text-[13.5px] sm:text-[14px] leading-relaxed font-normal text-center">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesWeUse;
