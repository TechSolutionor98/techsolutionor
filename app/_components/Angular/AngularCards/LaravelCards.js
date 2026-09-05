import React from "react";
import KeyFeatures from "@/components/KeyFeatures/KeyFeatures";
import { getCmsVal } from "@/lib/api-helper";

const angularKeyFeaturesDefault = [
  {
    title: "Two-Way Data Binding",
    desc: "AngularJS automatically synchronizes data between the model and the view, reducing boilerplate code and improving development efficiency. This ensures that any changes in the UI are instantly reflected in the data model and vice versa.",
  },
  {
    title: "MVC Architecture",
    desc: "Following the Model-View-Controller (MVC) pattern, AngularJS makes your code more structured, modular, and maintainable. This architecture is ideal for complex applications requiring scalability.",
  },
  {
    title: "Directives for Enhanced Interactivity",
    desc: "Custom directives let developers extend HTML functionality and create reusable components, enhancing interactivity and consistency across the application.",
  },
  {
    title: "Built-In Dependency Injection",
    desc: "AngularJS comes with dependency injection, which allows for organized management of components and services. This feature improves scalability and makes testing easier.",
  },
];

const AngularCards = ({ cmsContent }) => {
  const cards = angularKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "angularcards"),
    desc: getCmsVal(cmsContent, item.desc, "angularcards"),
  }));

  return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={cards} />;
};

export default AngularCards;
