import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const phpKeyFeaturesDefault = [
  {
    title: "Ease of Use",
    desc: "PHP’s simple and clear syntax makes it accessible for beginners, while still providing advanced functionality for experienced developers.",
  },
  {
    title: "Flexibility",
    desc: "PHP can be used to build everything from small scripts to complex enterprise-level applications, giving developers maximum flexibility.",
  },
  {
    title: "Compatibility",
    desc: "PHP is compatible with almost all web servers, including Apache, Nginx, and IIS, and can run on various operating systems.",
  },
  {
    title: "Frameworks",
    desc: "Popular frameworks like Laravel, Symfony, and CodeIgniter provide structured development environments, speeding up development and ensuring maintainable code.",
  },
];

const PhpCards = ({ cmsContent }) => {
  const cards = phpKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "phpcards"),
    desc: getCmsVal(cmsContent, item.desc, "phpcards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default PhpCards;
