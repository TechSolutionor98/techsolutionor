import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const htmlAdvantagesDefault = [
  {
    title: "Elements and Tags",
    desc: "HTML consists of a wide range of elements and tags, each serving a specific purpose for headings, paragraphs, lists, multimedia, and more.",
  },
  {
    title: "Forms and User Input",
    desc: "HTML provides robust form elements, enabling user interaction, data submission, and seamless integration with web applications.",
  },
  {
    title: "Links and Navigation",
    desc: "The a tag creates hyperlinks for navigation between pages and external resources, enhancing user experience and site structure.",
  },
];

const HtmlAdvantages = ({ cmsContent }) => {
  const defaultTitle = "Advantages";
  const sectionTitle = getCmsVal(cmsContent, defaultTitle, "htmladvantages");

  const advantagesData = htmlAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "htmladvantages"),
    desc: getCmsVal(cmsContent, item.desc, "htmladvantages"),
  }));

  return (
    <>
      <Advantages
        title={sectionTitle}
        subtitle="The foundational cornerstone of semantic, accessible, and high-performance modern web standards."
        items={advantagesData}
      />
      <div className="hidden">
        <h2>{defaultTitle}</h2>
      </div>
    </>
  );
};

export default HtmlAdvantages;
