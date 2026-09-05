import React from "react";
import Advantages from "@/components/Advantages/Advantages";

const reactAdvantagesData = [
  {
    title: "High Performance",
    desc: "React’s efficient rendering through the Virtual DOM ensures fast updates and smooth user experiences, even in complex applications.",
  },
  {
    title: "Flexibility and Scalability",
    desc: "The component-based structure makes React suitable for everything from small interfaces to large-scale enterprise applications.",
  },
  {
    title: "Strong Community and Ecosystem",
    desc: "React benefits from a massive global community and a rich ecosystem of libraries, tools, and frameworks such as Next.js and React Native.",
  },
];

const ReactAdvantages = () => {
  return (
    <Advantages
      title="Advantages"
      subtitle="Why modern engineering teams and enterprises choose React to power high-performance user interfaces."
      items={reactAdvantagesData}
    />
  );
};

export default ReactAdvantages;
