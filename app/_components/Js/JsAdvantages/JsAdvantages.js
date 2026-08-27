import React from "react";

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
    <section className="w-full bg-white px-5 py-14 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex justify-center">
          <h2 className="bg-[#41B349] px-7 py-2 text-center text-[34px] font-[700] leading-[1.1] text-white md:text-[38px]">
            Advantages
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jsAdvantagesData.map((item, idx) => (
            <article
              key={idx}
              className="min-h-[225px] rounded-[20px] border border-[#bfbfbf] bg-white px-8 py-7 text-center shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="text-[19px] font-[700] leading-[1.2] text-[#1f1f1f]">
                {item.title}
              </h3>
              <p className="mt-5 text-[15px] font-[400] leading-[1.85] text-[#1f1f1f]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JsAdvantages;
