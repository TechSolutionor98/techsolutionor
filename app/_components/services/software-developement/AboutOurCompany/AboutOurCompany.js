import React from "react";

const AboutOurCompany = () => {
  return (
    <div className="w-full mt-16 mb-20">
      <div className="relative z-10 max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
          {/* LEFT — HEADING */}
          <div className="w-full md:w-1/2 font-sans">
            <h1
              className=" tracking-wide leading-tight
          text-[32px] sm:text-[36px] md:text-[40px] lg:text-[58px]"
            >
              <span className="block">About</span>
              <span className="block">Our Company</span>
            </h1>
          </div>

          {/* RIGHT — TEXT */}
          <div className="w-full md:w-1/2 font-sanss">
            <p
              className=" max-w-[480px]
          text-sm sm:text-base leading-[35px] text-[#6D6D6D]"
            >
              IT TechSolutionor, we transform your ideas into digital
              masterpieces. Our expert team meticulously crafts software
              solutions that not only meet your needs but exceed expectations.
              Discover the art of innovative software development with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOurCompany;
