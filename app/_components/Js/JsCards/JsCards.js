import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";

const jsKeyFeatures = [
  {
    title: "Dynamic Scripting",
    desc: "JavaScript enables dynamic content updates, interactive features, and rich multimedia integration across modern web applications.",
  },
  {
    title: "Asynchronous Processing",
    desc: "Promises and async/await syntax allow seamless background data fetching and real-time user experiences without blocking execution.",
  },
  {
    title: "Rich Ecosystem",
    desc: "With npm, Node.js, and modern build tooling, JavaScript provides an unmatched ecosystem for both frontend and backend development.",
  },
  {
    title: "Cross-Platform Versatility",
    desc: "From web browsers to mobile apps and serverless environments, JavaScript delivers scalable performance across platforms.",
  },
];

const JsCards = () => {
  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={jsKeyFeatures} />;
};

export default JsCards;
