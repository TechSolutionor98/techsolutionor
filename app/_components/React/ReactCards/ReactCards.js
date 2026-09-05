import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";

const reactKeyFeatures = [
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

const ReactCards = () => {
  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={reactKeyFeatures} />;
};

export default ReactCards;
