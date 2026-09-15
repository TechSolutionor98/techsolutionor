import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const reactKeyFeaturesDefault = [
  {
    title: "Virtual DOM",
    desc: "React uses a Virtual DOM to optimize performance by updating only the necessary parts of the interface, reducing direct manipulation of the real DOM and improving application speed.",
  },
  {
    title: "JSX",
    desc: "JSX is a syntax extension that allows developers to write HTML-like code within JavaScript, making components easier to read, write, and debug.",
  },
  {
    title: "Unidirectional Data Flow",
    desc: "React follows a one-way data flow, which improves application predictability and makes debugging and maintenance more straightforward.",
  },
  {
    title: "React Hooks",
    desc: "React Hooks allow developers to use state, lifecycle features, and side effects in functional components, resulting in cleaner, more maintainable code.",
  },
];

const ReactCards = ({ cmsContent }) => {
  const title = getCmsVal(cmsContent, "NO RISK.", "reactcards");
  const subtitle = getCmsVal(cmsContent, "ONLY RESULTS.", "reactcards");

  const cards = reactKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "reactcards"),
    desc: getCmsVal(cmsContent, item.desc, "reactcards"),
  }));

  return <KeyFeatures title={title} subtitle={subtitle} features={cards} />;
};

export default ReactCards;
