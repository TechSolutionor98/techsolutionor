import React from "react";
import Image from "next/image";
import Icon1 from "../../../components/Images/posicon1.svg";
import Icon2 from "../../../components/Images/posicon2.svg";
import Icon4 from "../../../components/Images/posicon4.svg";
import Icon3 from "../../../components/Images/posicon3.svg";
const POSBestSoftware = () => {
  const features = [
    {
      title: "Modern & Attractive User Dashboard",
      desc: "Experience seamless business management with our modern POS dashboard. Quickly access sales data, inventory insights, and key performance metrics, helping you make smarter decisions faster.",
      icon: Icon1,
    },
    {
      title: "Easy Setup & No Technical Skills Needed",
      desc: "Install your POS system effortlessly with our user-friendly setup. No IT expertise is required, so you can start managing transactions, inventory, and operations from day one.",
      icon: Icon2,
    },
    {
      title: "Cost Effective With Affordable Price",
      desc: "Get advanced POS features at an affordable price. Our cost-effective solutions deliver secure, reliable, and scalable performance without stretching your budget.",
      icon: Icon3,
    },
    {
      title: "Flexible POS Software for All Businesses",
      desc: "Our customizable POS system adapts to any business type, from small retail stores to growing enterprises. Scalable features ensure smooth operations today and support your business growth tomorrow.",
      icon: Icon4,
    },
  ];

  return (
    <section className="pt-5 lg:pt-15 bg-white font-sans mb-5">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-white px-6 py-2 mb-4 font-semibold">
            Grow Your Business With TechSolutionor
          </div>
          <h2 className="text-[32px] md:text-[35px] font-bold ">
            Best Custom POS Software for Retail & <br />
            Modern Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-4 pb-10  border border-gray-100 rounded-[20px]
                                         shadow-[0_5px_20px_rgba(0,0,0,0.20)]
                                         
                                         flex flex-col items-start text-start justify-center
                                         group  relative"
            >
              <div className="mb-2 w-16 h-16 relative">
                <Image
                  src={item.icon}
                  alt={item.title}
                  layout="fill"
                  className="object-contain"
                />
              </div>
              <h3 className="text-[20px] font-semibold mb-2 text-[#41B349]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-[16px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default POSBestSoftware;
