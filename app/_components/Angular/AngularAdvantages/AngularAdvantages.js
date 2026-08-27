import React from "react";
import { getCmsVal } from "@/lib/api-helper";

const angularAdvantagesDefault = [
  {
    title: "Efficient and Faster Development",
    desc: "AngularJS reduces repetitive coding tasks, helping developers build complex UIs faster without compromising code quality.",
  },
  {
    title: "Strong Community Support",
    desc: "Backed by Google, AngularJS boasts a large, active developer community and comprehensive documentation, ensuring continuous support and updates.",
  },
  {
    title: "Ideal for Single-Page Applications (SPAs)",
    desc: "AngularJS is perfect for creating smooth, fast-loading SPAs. Users experience minimal page reloads and seamless transitions, improving engagement and usability.",
  },
];

const AngularAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "angularadvantages");

  const advantagesData = angularAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "angularadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "angularadvantages"),
  }));

  return (
    <section className="w-full bg-white px-5 py-14 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex justify-center">
          <h2 className="bg-[#41B349] px-7 py-2 text-center text-[34px] font-[700] leading-[1.1] text-white md:text-[38px]">
            {sectionTitle}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advantagesData.map((item, idx) => (
            <article
              key={idx}
              className="min-h-[225px] rounded-[20px] border border-[#bfbfbf] bg-white px-8 py-7 text-center shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="text-[19px] font-[700] leading-[1.2] text-[#1f1f1f]">
                {item.title}
              </h3>
              <p className="mt-5 text-[15px] font-[400] leading-[1.85] text-[#1f1f1f]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="hidden">
        <h2>{defaultTitle}</h2>
        {angularAdvantagesDefault.map((item, idx) => (
          <div key={idx}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AngularAdvantages;
