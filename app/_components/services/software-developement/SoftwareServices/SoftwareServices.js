"use client";
import React from "react";

const servicesData = [
  {
    title: "Custom Software Solutions",
    desc: "We design and build custom software applications tailored to your unique business processes and goals. Our solutions improve workflow efficiency, automate key operations and provide a competitive edge in your industry from enterprise platforms to specialized internal systems."
  },
  {
    title: "Platform Selection & Architecture",
    desc: "We help you choose the right tech stack, development framework and architectural approach based on your business needs, scalability goals and future expansion plans. Whether it’s web platforms, enterprise systems or hybrid software architectures, our solutions are built for long-term success."
  },
  {
    title: "API Integration & System Interoperability",
    desc: "Successfully integrate your custom software with third-party platforms, CRMs, ERPs and existing IT infrastructure. Our expert team ensures secure, reliable data exchange between systems, helping you maintain cohesive workflows and unified business operations."
  },
  {
    title: "Database & Security Management",
    desc: "We architect secure, high-performance databases and implement industry-standard security practices to protect business data and support rapid access. Our solutions include encrypted data storage, access control and compliance-ready security measures to safeguard your systems."
  },
  {
    title: "Mobile & Web App Development",
    desc: "We build responsive web applications and mobile software that deliver exceptional user experiences across devices. Whether your solution requires native mobile features, cross-platform support or web-based functionality, we deliver clean, intuitive applications built for performance."
  },
  {
    title: "Ongoing Maintenance & Support",
    desc: "Our services extend beyond launch. We provide continuous maintenance, updates, performance optimization and technical support to ensure your software remains secure, up-to-date and aligned with evolving business needs."
  }
];

const SoftwareServices = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white font-sans">
      <div className="max-w-[1140px] mx-auto px-5">
        {/* GREEN BADGE HEADING MATCHING SCREENSHOT */}
        <div className="flex justify-center mb-10 md:mb-14">
          <h2 className="bg-[#41b349] text-white font-bold text-[20px] sm:text-[25px] md:text-[28px] px-8 py-2.5 rounded-[12px] shadow-sm tracking-wide text-center">
            Our Software Development Services
          </h2>
        </div>

        {/* 6 CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {servicesData.map((service, idx) => (
            <div
              key={idx}
              className="group rounded-[20px] py-7 px-5 text-center flex flex-col items-center justify-start h-full min-h-[310px] bg-white border-2 border-[#41b349] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-[#41b349] hover:border-[#41b349] hover:shadow-[0_8px_30px_rgba(65,179,73,0.3)] transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-bold text-[18px] sm:text-[19px] mb-4 text-center leading-snug px-1 text-[#41b349] group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-center font-normal px-1 text-[#4a4a4a] group-hover:text-white/95 transition-colors duration-300">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareServices;
