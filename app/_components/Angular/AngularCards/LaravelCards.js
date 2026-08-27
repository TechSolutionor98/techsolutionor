import React from "react";
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
  const defaultBadge = "Key Features";
  const badgeTitle = getCmsVal(cmsContent, defaultBadge, "angularcards");

  const cards = angularKeyFeaturesDefault.map((item) => ({
    title: getCmsVal(cmsContent, item.title, "angularcards"),
    desc: getCmsVal(cmsContent, item.desc, "angularcards"),
  }));

  return (
    <section className="w-full bg-[#ffff] font-[Roboto,_sans-serif]">
      <div className="mx-auto w-full max-w-[1920px] [--card-width:280px] [--cards-gap:10px] [--cards-side-gap:16px]">
        <div className="px-5 pt-7 md:px-[var(--cards-side-gap)] lg:px-[var(--cards-side-gap)] lg:pt-[28px]">
          <div className="md:mx-auto md:w-[calc((var(--card-width)*4)+(var(--cards-gap)*3))]">
            <div className="inline-flex font-[Roboto,_sans-serif] rounded-t-[20px] bg-[#181818] px-4 py-3 text-[36px] font-[600] leading-[36px] text-white sm:text-[38px] md:px-6 md:py-4 md:text-[36px]">
              {badgeTitle}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#181818] px-5 pb-10 pt-10 md:px-[var(--cards-side-gap)] md:pb-12 md:pt-10 lg:px-[var(--cards-side-gap)] lg:pb-[62px] lg:pt-[60px]">
          <div className="grid grid-cols-1 gap-5 md:[grid-template-columns:repeat(4,var(--card-width))] md:justify-center md:gap-[var(--cards-gap)]">
            {cards.map((card, idx) => (
              <article
                key={idx}
                className="flex w-full min-h-[200px] flex-col items-center rounded-[32px] border border-[#5e5e5e] bg-black px-7 py-7 text-center text-white shadow-[0_0_18px_rgba(0,0,0,0.45)] md:min-h-[220px] md:w-[var(--card-width)] md:max-w-none md:px-6 md:py-7 lg:px-8 lg:py-8"
              >
                <h3 className="mx-auto max-w-[260px] text-[19px] font-[600] leading-[22.8px]">
                  {card.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[305px] text-[15px] font-[400] leading-[28.125px]">
                  {card.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden">
        <div>{defaultBadge}</div>
        {angularKeyFeaturesDefault.map((item, idx) => (
          <div key={idx}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AngularCards;
