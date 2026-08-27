import React from "react";
import BrandingIdentity from "../../../../../components/Images/Branding&Identity.png";
import Logo from "../../../../../components/Images/logodesign.png";
import PrintDesign from "../../../../../components/Images/printdesign.png";
import WebGraphics from "../../../../../components/Images/webdesign.png";
import Illustration from "../../../../../components/Images/illustration.png";
import MarketingMedia from "../../../../../components/Images/marketingmedia.png";
import Image from "next/image";

const BusinessGrowth = () => {
  const Services = [
    {
      img: BrandingIdentity,
      title: "Branding & Identity",
      desc: "Establish a strong and cohesive brand identity that accurately reflects your business values and vision.",
    },
    {
      img: Logo,
      title: "Logo Design",
      desc: "Craft distinctive and memorable logos that capture your brands essence",
    },
    {
      img: PrintDesign,
      title: "Print Design",
      desc: "Create visually appealing and effective print materials to communicate your message.",
    },
    {
      img: WebGraphics,
      title: "Web Graphic",
      desc: "Develop engaging and visually compelling digital assets for online platforms",
    },
    {
      img: Illustration,
      title: "Illustration",
      desc: "Create custom and expressive artwork to visually communicate ideas and concepts",
    },
    {
      img: MarketingMedia,
      title: "Marketing Media",
      desc: "Design impactful and persuasive materials to promote products and services effectively.",
    },
  ];
  return (
    <div>
      <section className="w-full py-12">
        <span className="uppercase text-white block mx-auto shadow-xl/20 max-w-[250px] bg-[#41b349]  px-0 py-2 justify-center text-center">
          graphics design services
        </span>
        {/* HEADING */}
        <h1 className="text-center text-[24px] md:text-[30px] text-[#262323] font-[700] tracking-wide">
          Exceptional Design Solutions to <br /> Elevate Your Business Growth
        </h1>

        {/* CARDS SECTION */}
        <div className="bg-[#181818] mt-10 py-15">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-4 max-w-[1140px] mx-auto px-5">
            {Services.map((item, idx) => (
              <div
                key={idx}
                className="bg-black p-5 text-center "
                style={{ boxShadow: "0 0 10px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="mx-auto mb-5"
                />
                <h2 className="text-[18px] font-semibold mb-3 text-white">
                  {item.title}
                </h2>

                <p className="text-[#CFCFCF] text-[16px] leading-[26px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessGrowth;
