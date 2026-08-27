import React from "react";
import ServiceImage from "../../../../../components/Images/servicesapp.png";
import Image from "next/image";

const MobileAppService = () => {
  return (
    <div className="relative w-full bg-white py-6 md:py-10 flex justify-center items-center">
      <div
        className="
          max-w-[1140px]
          mx-auto
          px-6 md:px-10
          flex flex-col md:flex-row
          items-start md:items-center
          gap-5
        "
      >
        <div className="w-full md:w-1/2 flex flex-col gap-5 md:gap-8">
          <h2 className="uppercase text-[#41b349] text-[22px] sm:text-[28px] md:text-[36px] font-extrabold leading-tight">
            our mobile app <br />
            development services
          </h2>

          <p className="text-[15px] sm:text-[16px] leading-relaxed text-gray-700 text-left max-w-[800px]">
            Mobile App Development Services, create design and deploy
            applications for IOS and Android Platforms. They ensure a seamless
            user experience through comprehensive coding, testing and
            maintenance.
          </p>
        </div>
        <div className="md:flex w-full md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-end">
          <Image
            src={ServiceImage}
            alt="Mobile App Services"
            width={200}
            height={200}
            className="w-full max-w-[180px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileAppService;
