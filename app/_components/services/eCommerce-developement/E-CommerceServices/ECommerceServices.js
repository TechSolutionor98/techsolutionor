import React from 'react';

const servicesData = [
  {
    title: "Custom Ecommerce Solutions",
    desc: "As an established ecommerce development company, we provide ecommerce website development services in UAE tailored to your unique business model. Our scalable online stores improve user experience, streamline operations and support sustainable growth for startups and enterprises in Dubai and global markets."
  },
  {
    title: "Platform Selection & Integration",
    desc: "Our team helps you choose the right ecommerce platform, including Shopify development, WooCommerce development and Magento ecommerce solutions, based on your business goals and scalability needs. As an experienced ecommerce web design agency, we ensure seamless integrations for long-term flexibility and performance."
  },
  {
    title: "Secure Payment Gateway Integration",
    desc: "We integrate secure and reliable payment gateways to ensure smooth transactions and full data protection. By supporting multiple payment options, we enhance customer trust, improve checkout experiences and increase conversion rates."
  },
  {
    title: "Shopping Cart Development",
    desc: "We design optimized, user-friendly shopping carts as part of our ecommerce web design with secure checkout systems and smooth navigation. Our streamlined checkout solutions reduce cart abandonment and improve overall ecommerce sales performance."
  },
  {
    title: "Ecommerce SEO & Digital Marketing",
    desc: "Our ecommerce website development’s clients rely on us for SEO services that optimize their online stores for higher search rankings and targeted traffic. Using proven digital marketing strategies, we help attract qualified customers and drive consistent sales growth in Dubai ,UAE and across the World."
  },
  {
    title: "Maintenance & Technical Support",
    desc: "We provide ongoing ecommerce website maintenance, security monitoring and performance optimization to keep your online store secure, updated and running efficiently, supporting businesses through ecommerce website development in competitive local and global markets."
  }
];

const ECommerceServices = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white font-sans">
      <div className="max-w-[1140px] mx-auto px-5">
        <h2 className="text-[28px] sm:text-[36px] md:text-[40px] font-extrabold text-[#111111] text-center tracking-tight leading-tight mb-10 md:mb-14">
          Our eCommerce <br className="hidden sm:inline" />
          Development Services
        </h2>

        {/* Grid matching B2B section container width and spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {servicesData.map((service, idx) => {
            return (
              <div
                key={idx}
                className="group rounded-[20px] py-6 px-4 sm:px-5 md:px-5 text-center flex flex-col items-center justify-start h-full min-h-[310px] bg-white text-[#333333] border-2 border-[#41b349] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:bg-[#41b349] hover:border-[#41b349] hover:shadow-[0_8px_30px_rgba(65,179,73,0.35)] transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-bold text-[18px] sm:text-[19px] md:text-[20px] mb-4 text-center leading-snug px-1 text-[#41b349] group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-center font-normal px-1 text-[#333333] group-hover:text-white/95 transition-colors duration-300">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ECommerceServices;
