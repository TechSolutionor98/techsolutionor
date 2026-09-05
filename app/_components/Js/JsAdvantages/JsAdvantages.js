import React from "react";
import Advantages from "@/components/Advantages/Advantages";

const jsAdvantagesData = [
  {
    title: "Versatility",
    desc: "JavaScript is used across multiple platforms, including web applications, mobile apps, server-side development (Node.js), and cloud-based solutions.",
  },
  {
    title: "Strong Community and Ecosystem",
    desc: "JavaScript has one of the largest developer communities, supported by countless libraries, frameworks, tools, and learning resources that continuously evolve the ecosystem.",
  },
  {
    title: "High Performance",
    desc: "JavaScript’s asynchronous and non-blocking architecture improves performance by reducing load times and delivering smooth, fast, and responsive user experiences.",
  },
];

const JsAdvantages = () => {
  return (
    <Advantages
      title="Advantages"
      subtitle="Powering dynamic, rich interactive web experiences across web, mobile, and enterprise platforms."
      items={jsAdvantagesData}
    />
  );
};

export default JsAdvantages;
