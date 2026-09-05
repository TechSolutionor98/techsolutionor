import React from "react";
import Advantages from "@/components/Advantages/Advantages";
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
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Architecting resilient single-page enterprise web applications with complete structural control."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
        {angularAdvantagesDefault.map((item, idx) => (
          <div key={idx}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AngularAdvantages;
