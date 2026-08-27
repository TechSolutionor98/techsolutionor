import React from 'react';

export const icons = [
  // 1. Expert Developers Icon
  (
    <svg className="w-16 h-16 text-black" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="18" r="8" />
      <path d="M26 18h4M34 18h4" />
      <path d="M27 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM37 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      <path d="M29 18h6" />
      <path d="M18 36c0-6 6-10 14-10s14 4 14 10" />
      <rect x="20" y="36" width="24" height="14" rx="2" fill="white" />
      <path d="M16 50h32" />
      <path d="M27 41l-2 2 2 2M37 41l2 2-2 2M33 40l-2 6" strokeWidth="1.8" />
    </svg>
  ),
  // 2. Custom Solutions Icon
  (
    <svg className="w-16 h-16 text-black" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="22" width="28" height="20" rx="2" fill="white" />
      <path d="M28 42v5M36 42v5M24 47h16" />
      <path d="M32 10a7 7 0 0 0-5 11.9c1.2 1.3 2 2.6 2 4.1h6c0-1.5.8-2.8 2-4.1A7 7 0 0 0 32 10z" fill="white" />
      <path d="M30 29h4" />
      <path d="M32 6v2M22 12l1.5 1.5M42 12l-1.5 1.5" />
      <circle cx="25" cy="32" r="3" />
      <path d="M25 27v1M25 35v1M20 32h1M29 32h1" />
      <circle cx="39" cy="32" r="2.5" />
      <path d="M36.5 32l5 3M36.5 35l5-3" />
    </svg>
  ),
  // 3. Fast Delivery Icon
  (
    <svg className="w-16 h-16 text-black" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="22" y="26" width="22" height="16" rx="2" fill="white" />
      <path d="M44 32h7l4 5v5h-11v-10z" fill="white" />
      <circle cx="29" cy="44" r="4" fill="white" />
      <circle cx="47" cy="44" r="4" fill="white" />
      <path d="M14 30h5M11 35h6M14 40h5" />
      <circle cx="33" cy="34" r="5" fill="white" />
      <path d="M33 31v3h2" />
    </svg>
  ),
  // 4. Affordable Pricing Icon
  (
    <svg className="w-16 h-16 text-black" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 36v12h-5a2 2 0 0 1-2-2V38a2 2 0 0 1 2-2h5z" />
      <path d="M22 36l5-10a3 3 0 0 1 5 3v3h6a3 3 0 0 1 3 3.5l-2 9.5a4 4 0 0 1-4 3H22" fill="white" />
      <circle cx="40" cy="22" r="9" fill="white" />
      <path d="M40 17v10M37.5 19.5c0-1 1.2-1.5 2.5-1.5s2.5.5 2.5 1.5-1 2-2.5 2.5-2.5 1-2.5 2.5 1.2 1.5 2.5 1.5 2.5-.5 2.5-1.5" strokeWidth="1.8" />
      <path d="M28 16l1.5 1.5M49 28l1.5 1.5" />
    </svg>
  ),
  // 5. 24/7 Support Icon
  (
    <svg className="w-16 h-16 text-black" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 32a14 14 0 1 1-4.1-9.9" />
      <path d="M42 16l4 6.1-6.1 1" />
      <path d="M18 32a14 14 0 0 1 4.1-9.9" />
      <path d="M22 26l-4-6.1 6.1-1" />
      <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none" fontFamily="sans-serif">
        24/7
      </text>
    </svg>
  ),
  // 6. Growth Results Icon
  (
    <svg className="w-16 h-16 text-black" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="24" width="28" height="18" rx="2" fill="white" />
      <path d="M14 42h36" />
      <path d="M24 36l4-4 4 2 6-7" />
      <path d="M34 27h4v4" />
      <circle cx="42" cy="20" r="4" fill="white" />
      <path d="M42 14v2M42 24v2M36 20h2M46 20h2" />
    </svg>
  )
];

export const defaultWhyChooseData = [
  {
    title: "Expert E-commerce Developers",
    desc: "Our team of skilled developers, designers and UX specialists is what makes TechSolutionor a leading ecommerce development company in Dubai. We focus on creating secure, responsive and user-friendly ecommerce platforms that drive sales and provide a seamless shopping experience.",
    icon: icons[0]
  },
  {
    title: "Custom Digital Solutions",
    desc: "Every business is unique and so is our approach as an ecommerce website design company. We develop tailored online stores, shopping carts and payment integrations that align perfectly with your brand, business goals and customer needs.",
    icon: icons[1]
  },
  {
    title: "Fast & Agile Delivery",
    desc: "We follow an agile development process that allows us to deliver your ecommerce store quickly without compromising on quality, performance or security.",
    icon: icons[2]
  },
  {
    title: "Affordable & Transparent Pricing",
    desc: "As a competitively priced ecommerce web design company, we offer professional ecommerce development at clear and transparent rates. No hidden fees, just honest pricing so you can confidently invest in building your online store.",
    icon: icons[3]
  },
  {
    title: "24/7 Ongoing Support",
    desc: "Our support continues after your store goes live. We provide maintenance, updates, troubleshooting and technical assistance to ensure your ecommerce platform runs smoothly around the clock.",
    icon: icons[4]
  },
  {
    title: "Proven Growth Results",
    desc: "Our ecommerce solutions are designed not just to look great, but to increase sales, improve customer engagement and drive measurable growth for your online business.",
    icon: icons[5]
  }
];

export const softwareWhyChooseData = [
  {
    title: "Expert Software Developers",
    desc: "Our team of experienced software engineers, architects and designers specializes in building robust, scalable and secure software solutions. As a leading software development company in Dubai, we follow industry best practices and modern development frameworks to deliver high-quality applications tailored to your business needs.",
    icon: icons[0]
  },
  {
    title: "Custom Digital Solutions",
    desc: "Every business has unique challenges. We design and develop custom software from enterprise systems to specialized applications that align perfectly with your workflows, objectives and industry requirements.",
    icon: icons[1]
  },
  {
    title: "Fast & Agile Delivery",
    desc: "We follow an agile development approach that enables rapid delivery while maintaining flexibility, reliability and high-quality standards throughout the software development lifecycle.",
    icon: icons[2]
  },
  {
    title: "Affordable & Transparent Pricing",
    desc: "We provide professional software development services in Dubai at competitive, transparent rates. No hidden fees, just clear pricing so you can confidently invest in custom software solutions for your organization.",
    icon: icons[3]
  },
  {
    title: "24/7 Ongoing Support",
    desc: "Our partnership doesn't end at deployment. We offer continuous maintenance, updates and technical support to ensure your software runs smoothly, securely and efficiently at all times.",
    icon: icons[4]
  },
  {
    title: "Proven Growth Results",
    desc: "Our custom software solutions are designed not just to function flawlessly, but to optimize business operations, increase productivity and drive measurable, long-term growth.",
    icon: icons[5]
  }
];

export const appWhyChooseData = [
  {
    title: "Expert App Developers",
    desc: "As one of the top app development companies, our team of skilled mobile app developers, UX/UI designers and software engineers brings deep expertise in creating high-performance iOS and Android apps. We follow best coding practices and leverage the latest technologies to deliver secure, reliable and user-friendly applications.",
    icon: icons[0]
  },
  {
    title: "Custom Digital Solutions",
    desc: "Every business is unique and so is our approach to app development. We create tailored mobile applications that perfectly align with your business goals, target audience and platform requirements.",
    icon: icons[1]
  },
  {
    title: "Fast & Agile Delivery",
    desc: "We follow an agile app development process that allows us to deliver projects quickly while maintaining high quality, performance and flexibility throughout development.",
    icon: icons[2]
  },
  {
    title: "Affordable & Transparent Pricing",
    desc: "We offer top-quality mobile app development services in UAE at clear and competitive rates. No hidden costs, just transparent pricing so you can confidently invest in building your mobile app.",
    icon: icons[3]
  },
  {
    title: "24/7 Ongoing Support",
    desc: "Our support doesn't end after your app launches. We provide continuous maintenance, updates and technical assistance to ensure your app runs smoothly, stays secure and keeps users engaged.",
    icon: icons[4]
  },
  {
    title: "Proven Growth Results",
    desc: "Our custom app solutions are designed not just to function flawlessly, but to optimize business operations, increase productivity and drive measurable, long-term growth.",
    icon: icons[5]
  }
];

export const webWhyChooseData = [
  {
    title: "Expert Developers",
    desc: "Our team of skilled website developers, designers and UX specialists brings deep expertise in creating responsive, modern websites. We follow best coding practices and use the latest frameworks to deliver fast, secure and reliable web solutions.",
    icon: icons[0]
  },
  {
    title: "Custom Digital Solutions",
    desc: "Every business is unique and so is our website design and development. As a leading website design company, we create fully customized websites and web applications that align perfectly with your brand, business goals and target audience.",
    icon: icons[1]
  },
  {
    title: "Fast & Agile Delivery",
    desc: "We follow an agile web development process that enables us to deliver projects quickly while maintaining top-notch quality, functionality and responsiveness.",
    icon: icons[2]
  },
  {
    title: "Affordable & Transparent Pricing",
    desc: "We offer high quality web development services at competitive and transparent rates. No hidden fees, just clear pricing so you can confidently invest in building a professional website for your business.",
    icon: icons[3]
  },
  {
    title: "24/7 Ongoing Support",
    desc: "Our support doesn't stop after launch. We provide continuous website maintenance, updates and troubleshooting to ensure your site runs smoothly and stays secure 24/7.",
    icon: icons[4]
  },
  {
    title: "Proven Growth Results",
    desc: "Our custom web solutions are designed not just to look great, but to streamline operations, enhance user experience and drive measurable growth for your business.",
    icon: icons[5]
  }
];

const WhyChoose = ({ items = defaultWhyChooseData }) => {
  return (
    <section className="w-full bg-white py-14 md:py-20 font-sans relative overflow-hidden">
      {/* Decorative green wavy background lines on left edge */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-12 pointer-events-none opacity-40 hidden md:block">
        <svg className="w-full h-full text-[#41b349]" viewBox="0 0 100 400" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M-20 50 Q 60 150 -20 250 T -20 350" />
          <path d="M-40 100 Q 40 200 -40 300" />
        </svg>
      </div>

      <div className="max-w-[1140px] mx-auto px-5 relative z-10">
        
        {/* SECTION HEADING ON 2 DISTINCT LINES */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
          <h2 className="text-[30px] sm:text-[38px] md:text-[44px] font-extrabold text-[#262323] tracking-tight leading-tight mb-2">
            Why Choose
          </h2>
          <div>
            <span className="bg-[#41b349] text-white px-4 py-1.5 rounded-[8px] text-[30px] sm:text-[38px] md:text-[44px] font-extrabold inline-block shadow-sm leading-tight">
              Tech Solutionor
            </span>
          </div>
        </div>

        {/* 6 CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] p-7 md:p-8 text-center flex flex-col items-center justify-center min-h-[270px] md:min-h-[300px] border border-gray-100/90 shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:bg-[#41b349] hover:border-[#41b349] hover:shadow-[0_12px_35px_rgba(65,179,73,0.3)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden relative"
            >
              {/* DEFAULT STATE: ICON + TITLE (HIDDEN ON HOVER) */}
              <div className="flex flex-col items-center justify-center group-hover:hidden transition-all duration-300">
                {/* ICON */}
                <div className="mb-5 p-3 rounded-full bg-gray-50/50">
                  {item.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-[#41b349] font-bold text-[19px] sm:text-[21px] md:text-[22px] leading-snug text-center">
                  {item.title}
                </h3>
              </div>

              {/* HOVER STATE: ONLY DESCRIPTION TEXT ON GREEN BACKGROUND */}
              <div className="hidden group-hover:flex flex-col items-center justify-center h-full transition-all duration-300 px-2">
                <p className="text-white text-[13.5px] sm:text-[14.5px] leading-relaxed font-normal text-center">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;
