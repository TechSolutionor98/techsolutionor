import React from 'react'
import UIDesign from "../../../../../components/Images/uidesign.png";
import UXDesign from "../../../../../components/Images/uxdesign.png";
import TypoGraphy from "../../../../../components/Images/typography.png";
import ThumbUp from "../../../../../components/Images/thumbsup.png";
import Image from "next/image";

const DesignServices = () => {
    const Services = [
        {
          img: UIDesign,
          title: "UI Design",
          desc: "Our UI design services focus on creating visually appealing and user-friendly interfaces that ensure seamless interactions and a consistent brand experience across all digital platforms.",
        },
        {
          img: UXDesign,
          title: "UX Design",
          desc: "Our UX research and analysis services delve into user behaviors and needs, providing insights that guide the design process to enhance usability, user satisfaction, and overall experience.",
        },
        {
          img: TypoGraphy,
          title: "Prototyping",
          desc: "Our prototyping services transform ideas into interactive models, allowing for early testing and iteration to refine user experiences and ensure design effectiveness before final implementation.",
        },
        {
          img: ThumbUp,
          title: "Thum Up",
          desc: "Our user testing services gather valuable feedback from real users, enabling us to identify issues and optimize designs for maximum usability, satisfaction, and effectiveness.",
        },
      ];
  return (
    <div>
      <section className="w-full py-12">
              <span className="uppercase text-white block mx-auto shadow-xl/20 max-w-[250px] bg-[#41b349]  px-0 py-2 justify-center text-center mb-3 ">
                Our ui/ux deisgn services
              </span>
              {/* HEADING */}
              <p className="md:text-center text-justify px-5  text-[16px] max-w-[900px] mx-auto text-[#262323]  tracking-wide">
                Our UI/UX design services deliver exceptional digital experiences. We create visually compelling interfaces for seamless user interactions and consistent branding. Our in-depth UX research informs designs to enhance usability and satisfaction. Prototyping brings ideas to life for early testing, while user testing refines designs based on feedback, ensuring they are intuitive and effective.
              </p>
      
              {/* CARDS SECTION */}
              <div className="bg-[#181818] mt-10 py-15">
                <div className="grid grid-cols-1 md:grid-cols-4  gap-4 max-w-[1140px] mx-auto px-5">
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
  )
}

export default DesignServices
