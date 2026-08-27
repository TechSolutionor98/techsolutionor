import React from "react";
import JsIcon from "@/components/Images/jsicon_3d.png";
import Image from "next/image";

const JsFramework = () => {
  return (
    <section className="w-full bg-[#ffff] -mb-20">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10 px-6 py-14 md:flex-row md:items-center md:gap-8 md:px-12 md:py-[78px] lg:px-16">
        <div className="flex w-full justify-center md:w-[40%] md:justify-center">
          <Image
            src={JsIcon}
            alt="JavaScript Icon"
            width={260}
            height={260}
            className="h-[260px] w-[260px] object-contain md:h-[260px] md:w-[260px]"
          />
        </div>

        <div className="w-full md:w-[60%] md:pr-4 lg:pr-10">
          <h1 className="text-[28px] font-[700] leading-[1.25] text-[#1f1f1f]">
            The Backbone of Modern Web Development
          </h1>
          <p className="mt-8 text-[16px] leading-[2] text-justify text-[#1f1f1f]">
            JavaScript is a powerful and versatile programming language that drives the dynamic and interactive behavior of modern websites and applications. As a core technology of web development, JavaScript enables responsive designs, real-time updates, and seamless user experiences across all devices and platforms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JsFramework;
