import React from 'react'

const B2B = () => {

  const Services = [
    {
      title: 'Custom E-commerce Solutions',
      desc: 'With deep expertise in ecommerce development, we develop tailored B2B ecommerce platforms that address the specific needs of your business, including advanced product catalogs, personalized pricing and custom workflows, designed to streamline operations and enhance the buyer experience for UAE and international clients.'
    },
    {
      title: 'Wholesale and Bulk Order Management',
      desc: 'Our solutions simplify large-volume order management with features like tiered pricing, bulk ordering and automated order processing, helping businesses reduce operational friction and improve efficiency.'
    },
    {
      title: 'Business to Businesss Marketplaces',
      desc: 'We build scalable B2B marketplaces that enable multiple vendors, complex pricing structures and seamless transaction management, ideal for businesses looking to expand their wholesale and distribution operations globally.'
    },
    {
      title: 'Enterprise Resource Planning Integration',
      desc: 'We integrate your B2B platform with ERP systems to efficiently manage inventory, orders and customer data, ensuring smooth workflows and improved operational control across multiple markets.'
    },
    {
      title: 'Advanced Analytics and Reporting',
      desc: 'Our platforms include powerful analytics and reporting tools, giving you actionable insights into sales trends, customer behavior and operational performance, supporting data-driven decision-making and business growth.'
    },
    {
      title: 'Secure Payment Gateways',
      desc: 'We implement secure, reliable payment solutions that support multiple currencies and payment methods, enabling safe international transactions and building trust with your B2B clients.'
    },
  ];

  return (
    <section className="w-full bg-white py-12">

      {/* HEADING */}
      <h1 className="text-center text-[24px] md:text-[35px] text-[#262323] font-[700] tracking-wide">
        B2B E-commerce Services
      </h1>

      {/* CARDS SECTION */}
      <div className="bg-[#181818] mt-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-[1140px] mx-auto px-5">

          {Services.map((item, idx) => (
            <div
              key={idx}
              className="bg-black p-6 text-center rounded-xl border border-white/20 transition-all duration-300 hover:border-white/40 flex flex-col justify-start"
              style={{ boxShadow: '0 0 10px rgba(0,0,0,0.4)' }}
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

export default B2B;
