import React from "react";

const B2C = () => {
  const Services = [
    {
      title: "User-Friendly Online Stores",
      desc: "As a trusted name in ecommerce website design in Dubai, we design engaging, easy-to-navigate online stores that enhance the shopping experience for your customers, driving higher engagement and repeat purchases.",
    },
    {
      title: "Mobile Commerce Solutions",
      desc: "Our responsive, mobile-friendly ecommerce websites, supported by our ecommerce app development expertise, deliver seamless shopping experiences across every device, enabling your business to serve customers locally and worldwide.",
    },
    {
      title: "SEO and Digital Marketing",
      desc: "We implement proven SEO and digital marketing strategies to increase your store's visibility, attract targeted traffic and boost online sales.",
    },
    {
      title: "Customer Relationship Management",
      desc: "We integrate CRM systems to manage customer interactions, improve loyalty and streamline sales processes, helping you build stronger, long-term customer relationships.",
    },
    {
      title: "Personalization and Recommendations",
      desc: "We add personalized product recommendations and targeted promotions to increase conversions, enhance user satisfaction and drive repeat business.",
    },
    {
      title: "Secure Checkout Processes",
      desc: "We implement secure, seamless checkout processes that protect customer data, build trust and reduce cart abandonment, ensuring a smooth end-to-end shopping experience.",
    },
  ];

  return (
    <section className="w-full bg-white py-12">
      {/* HEADING */}
      <h1 className="text-center text-[24px] md:text-[35px] font-[700] text-[#262323] tracking-wide">
        B2C E-commerce Services
      </h1>

      {/* CARDS SECTION */}
      <div className="bg-[#181818] mt-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-[1140px] mx-auto px-5">
          {Services.map((item, idx) => (
            <div
              key={idx}
              className="bg-black p-6 text-center rounded-xl border border-white/20 transition-all duration-300 hover:border-white/40 flex flex-col justify-start"
              style={{ boxShadow: "0 0 10px rgba(0,0,0,0.4)" }}
            >
              <h2 className="text-[18px] font-semibold mb-3 text-white">
                {item.title}
              </h2>

              <p className="text-[#CFCFCF] text-[15px] leading-[26px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default B2C;
