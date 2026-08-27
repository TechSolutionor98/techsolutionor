import React from "react";
import Image from "next/image";
import InboundIcon from "../../../../../components/Images/callicon1.png";
import OutboundIcon from "../../../../../components/Images/callicon2.png";
import SupportIcon from "../../../../../components/Images/callicon3.png";
import CustomIcon from "../../../../../components/Images/callicon4.png";
import FunnelImg from "../../../../../components/Images/callimage1.jpg"; 
import OutboundImg from "../../../../../components/Images/callimage2.png"; 
import CustomImg from "../../../../../components/Images/callimage3.png"; 
import SupportImg from "../../../../../components/Images/callimage4.png"; 

const CallCenterOfferings = () => {
  const offerings = [
    {
      title: "Inbound Campaign",
      desc: "Handle all incoming customer queries efficiently with our professional inbound campaign services. We ensure every customer feels valued, improving satisfaction, loyalty, and retention rates.",
      icon: InboundIcon,
    },
    {
      title: "Outbound Campaign",
      desc: "Boost your brand presence and drive growth with our outbound campaign services. Our team expertly engages prospects, connecting with potential clients to generate leads and business opportunities.",
      icon: OutboundIcon,
    },
    {
      title: "Dedicated Customer Support",
      desc: "Our dedicated support team is available 24/7 to resolve issues and provide personalized assistance. We deliver fast, reliable solutions to enhance your customer experience and build trust.",
      icon: SupportIcon,
    },
    {
      title: "Custom Call Center Services",
      desc: "We offer tailored call center solutions designed to meet your unique business needs. From managing customer inquiries to running targeted campaigns, our team delivers flexible, scalable services that fit your objectives.",
      icon: CustomIcon,
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Header Tag */}
        <div className="text-center mb-5">
          <div className="inline-block bg-[#232323] text-white px-5 py-2 shadow-[0_9px_3px_rgba(0,0,0,0.26)] mb-8">
            <h2 className="text-[20px] md:text-[14px] tracking-tight font-semibold ">
              What We Are Offering
            </h2>
          </div>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-15">
          {offerings.map((item, idx) => (
            <div
              key={idx}
              className="p-4 pb-15  border border-gray-100 rounded-[20px]
                         shadow-[0_5px_20px_rgba(0,0,0,0.20)]
                         transition-all duration-500 ease-out
                         transform
                         hover:scale-105 hover:z-10 hover:bg-white
                         flex flex-col items-start text-start justify-center
                         group cursor-pointer relative"
            >
              <div className="mb-4 w-16 h-16 relative">
                <Image
                  src={item.icon}
                  alt={item.title}
                  layout="fill"
                  className="object-contain"
                />
              </div>
              <h3 className="text-[20px] font-bold mb-4 text-[#41B349]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Sections (Inbound/Outbound example) */}
        <div className="space-y-32">
          {/* Inbound Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-[55%]">
              <h2 className="text-[30px] md:text-[33px] font-semibold text-[#232323] mb-8">
                Inbound Campaign
              </h2>
              <p className="text-gray-700 text-[18px] leading-relaxed mb-4">
                Our inbound campaign services deliver a seamless experience for
                your customers.
              </p>
              <p className="text-gray-600 text-[18px] leading-relaxed">
                Whether they need support, have questions about your products,
                or want to place an order, our team handles every inquiry
                professionally and efficiently. We minimize wait times and
                prioritize customer satisfaction to enhance your brand’s
                reputation locally in the UAE and globally.
              </p>
            </div>
            <div className="w-full lg:w-[45%] flex justify-center">
              <div className="relative w-full max-w-[450px]">
                <Image
                  src={FunnelImg.src}
                  alt="Inbound Campaign Illustration"
                  layout="responsive"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Outbound Section - Simplified implementation for brevity, follow same pattern */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 -mt-10">
            <div className="w-full lg:w-[55%]">
              <h2 className="text-[30px] md:text-[33px] font-semibold text-[#232323] mb-8  text-right md:text-left">
                Outbound Campaign
              </h2>
              <p className="text-gray-700 text-[18px] leading-relaxed mb-6 text-right md:text-left">
                Our outbound campaign services help grow your business by
                actively connecting with potential customers.
              </p>
              <p className="text-gray-600 text-[18px] leading-relaxed text-right md:text-left">
                From surveys and product promotions to lead follow-ups, our
                experienced agents communicate your brand’s message clearly,
                driving engagement and helping you achieve business objectives.
              </p>
            </div>
            <div className="w-full lg:w-[45%] flex justify-center">
              <div className="relative w-full max-w-[400px]">
                <Image
                  src={OutboundImg.src}
                  alt="Inbound Campaign Illustration"
                  layout="responsive"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          {/* Inbound Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 -mt-25">
            <div className="w-full lg:w-[55%] ">
              <h2 className="text-[30px] md:text-[33px] font-semibold text-[#232323] mb-8">
                Dedicated Customer Support
              </h2>
              <p className="text-gray-700 text-[18px] leading-relaxed mb-6">
                Our dedicated customer support team acts as an extension of your brand. Available 24/7, we provide timely assistance and solutions to your customers, ensuring every query is resolved efficiently. With our support, your customers receive consistent, high-quality service that strengthens loyalty and trust.
              </p>
            </div>
            <div className="w-full lg:w-[45%] flex justify-center">
              <div className="relative w-full max-w-[450px]">
                <Image
                  src={CustomImg.src}
                  alt="Inbound Campaign Illustration"
                  layout="responsive"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Outbound Section - Simplified implementation for brevity, follow same pattern */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 -mt-35">
            <div className="w-full lg:w-[55%]">
              <h2 className="text-[30px] md:text-[33px] font-semibold text-[#232323] mb-8 text-right md:text-left">
                Custom Call Center Services
              </h2>
              <p className="text-gray-700 text-[18px] leading-relaxed mb-6 text-right md:text-left">
                We design custom call center solutions to meet your business’s unique needs. Whether you require multilingual support, technical assistance, or specialized customer service, our scalable services adapt to your requirements. Our goal is to provide a seamless experience that grows with your business, enhancing customer satisfaction and operational efficiency.
              </p>
            </div>
            <div className="w-full lg:w-[45%] flex justify-center">
              <div className="relative w-full max-w-[450px]">
                <Image
                  src={SupportImg}
                  alt="Inbound Campaign Illustration"
                  layout="responsive"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallCenterOfferings;
