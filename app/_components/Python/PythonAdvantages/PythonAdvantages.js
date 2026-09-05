import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const pythonAdvantagesDefault = [
  {
    title: "Rapid Development",
    desc: "Python’s clean syntax and rich library ecosystem allow developers to prototype and build applications quickly and efficiently.",
  },
  {
    title: "Versatility",
    desc: "Python is used for web apps, desktop software, data science, AI, machine learning, automation, and more, making it highly versatile for multiple domains.",
  },
  {
    title: "Strong Community Support",
    desc: "Python has a large, active global community offering extensive tutorials, frameworks, modules, and resources, ensuring continuous learning and problem-solving support.",
  },
];

const PythonAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "pythonadvantages");

  const advantagesData = pythonAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "pythonadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "pythonadvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="Empowering digital innovation with versatile, high-velocity engineering and intelligence."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default PythonAdvantages;
