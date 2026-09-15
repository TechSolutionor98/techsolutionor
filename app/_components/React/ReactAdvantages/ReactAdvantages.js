import React from "react";
import Advantages from "@/components/Advantages/Advantages";
import { getCmsVal } from "@/lib/api-helper";

const reactAdvantagesDefault = [
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

const ReactAdvantages = ({ cmsContent }) => {
  const title = getCmsVal(cmsContent, "Advantages", "reactadvantages");
  const subtitle = getCmsVal(
    cmsContent,
    "Why modern engineering teams and enterprises choose React to power high-performance user interfaces.",
    "reactadvantages"
  );

  const items = reactAdvantagesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "reactadvantages"),
    desc: getCmsVal(cmsContent, item.desc, "reactadvantages"),
  }));

  return (
    <Advantages
      title={title}
      subtitle={subtitle}
      items={items}
    />
  );
};

export default ReactAdvantages;
