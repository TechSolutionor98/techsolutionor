import React from "react";
import About from "../../../../../components/Images/about-01.png";
import About2 from "../../../../../components/Images/about-02.png";
import Rocket from "../../../../../components/Images/rocketicon.png";
import Security from "../../../../../components/Images/secrrity.png";
import Stars from "../../../../../components/Images/delivered.png";
import Image from "next/image";

const TechSolutionorAbout = () => {
  return (
    <div>
      {/* CONTAINER */}
      <div className="max-w-[1140px] mx-auto px-5 md:my-[20px] mb-5">
        {/* MAIN ROW */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div className="w-full md:w-[30%] flex flex-col  item center gap-10">
            {/* STAT ITEM */}
            <div className="flex items-start sm:flex-col sm:items-start sm:justify-center md:flex-row gap-4">
              <Image
                src={Rocket}
                alt="Rocket Icon"
                width={73}
                height={73}
                className="shrink-0"
              />
              <div>
              <h3 className="text-[#41b349] text-2xl font-bold">15+</h3>
              
                
                <p className="text-gray-700 text-sm">
                  Delivered Software Projects
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Image
                src={Stars}
                alt="Stars Icon"
                width={73}
                height={73}
                className="shrink-0"
              />
              <div>
                <h3 className="text-[#41b349] text-2xl font-bold">90%</h3>
                <p className="text-gray-700 text-sm">Customer Satisfaction</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Image
                src={Security}
                alt="Security Icon"
                width={73}
                height={73}
                className="shrink-0"
              />
              <div>
                <h3 className="text-[#41b349] text-2xl font-bold">100%</h3>
                <p className="text-gray-700 text-sm">
                  Highly Accredited Security
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button className="mt-4 w-fit bg-[#41b349] text-white px-2 py-3 font-medium hover:bg-[#41b349] transition">
              About TechSolutionor →
            </button>
          </div>

          {/* ================= CENTER COLUMN ================= */}
          <div className="w-full md:w-[35%] flex flex-col text-justify md:items-start  gap-6">
            {/* IMAGE */}
            <div className="w-full">
              <Image
                src={About2}
                alt="Team discussion"
                width={300}
                height={300}
                className=" w-full h-auto object-contain"
              />
            </div>

            {/* TEXT */}
            <p className="text-[#6D6D6D] text-sm leading-relaxed">
              With a team of experienced professionals, we specialize in
              creating innovative, high-quality software solutions tailored to
              meet your unique business needs. Our commitment to excellence,
              attention to detail, and customer-centric approach ensure that we
              deliver top-tier products that drive success.
            </p>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="w-full md:w-[35%]">
            <Image
              src={About}
              alt="Office team"
              className=" w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSolutionorAbout;
