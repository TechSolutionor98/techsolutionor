import React from "react";
import LeftQuote from "../../../../../components/Images/leftqoute.png";
import RightQuote from "../../../../../components/Images/rightqoute.png";
import Image from 'next/image' 

const SEOFramework = () => {
  return (
    <section className="bg-white py-20 px-6 font-sans overflow-hidden">
      <div className="max-w-[1100px] mx-auto text-center relative group">
        {/* Quotation Icons with hover animation */}
        <div className="absolute -top-10 left-0 opacity-50">
          <Image
            src={LeftQuote}
            alt="single quote"
            className="w-[80px] h-[80px] object-contain"
          />
        </div>

        <div className="relative z-10">
          <h2
            className="italic text-[28px] md:text-[42px] font-bold text-[#262323] uppercase tracking-tighter mb-10
                    "
          >
            AWARD-WINNING SEO AGENCY IN THE <br className="hidden md:block" />{" "}
            UAE
          </h2>

          <div className="max-w-[900px] mx-auto">
            <p className="text-gray-600 text-base md:text-[17px] leading-[1.8] mb-6 ">
              Tech Solutionor is a highly recognized SEO agency in UAE, trusted
              by businesses looking to scale through organic search. As a
              leading SEO services Dubai provider, we combine technical
              expertise, strategic planning, and performance tracking to deliver
              consistent ranking improvements. If you’re searching for the best
              SEO company in Dubai or need expert-level SEO consulting in Abu
              Dhabi, our team is ready to help.
            </p>
          </div>
        </div>

        <div className="absolute -bottom-10 right-0 opacity-50">
          <Image 
            src={RightQuote}
            alt="single quote right"
            className="w-[80px] h-[80px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default SEOFramework;
