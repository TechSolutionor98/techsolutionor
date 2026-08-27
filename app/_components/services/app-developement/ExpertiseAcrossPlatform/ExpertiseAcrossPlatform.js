import React from "react";

const expertiseData = [
  {
    titleLine1: "Android",
    titleLine2: "App Development",
    stack: "Java • Kotlin • Android Studio",
    desc: "We develop high-performance Android applications built for speed, security and scalability. Our android app development company focuses on seamless user experience, modern UI design and reliable performance across all Android devices for businesses in the UAE and globally.",
  },
  {
    titleLine1: "iOS",
    titleLine2: "App Development",
    stack: "Swift • Objective-C • Xcode",
    desc: "Our ios app development company delivers secure, elegant and scalable applications for iPhone and iPad. Built with Swift and Objective-C, we ensure smooth performance, App Store compliance and premium user experiences for startups and enterprises worldwide.",
  },
  {
    titleLine1: "Cross-Platform",
    titleLine2: "App Development",
    stack: "React Native • Flutter • Xamarin • Ionic",
    desc: "We build cost-effective cross-platform apps that run seamlessly on both Android and iOS. As a top application development company in Dubai, we use modern frameworks like Flutter and React Native to help businesses reduce development time, optimize costs and launch faster in global markets.",
  },
];

const ExpertiseAcrossPlatform = () => {
  return (
    <section className="w-full bg-white py-10 md:py-10 font-sans">
      <div className="max-w-[1140px] mx-auto px-5">
        {/* MAIN SECTION HEADING */}
        <h2 className="text-[26px] sm:text-[30px] md:text-[34px] font-bold  text-[#111111] text-center tracking-tight mb-6 md:mb-8">
          Our Development Expertise Across Platform
        </h2>

        {/* 3 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {expertiseData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] p-7 sm:p-8 flex flex-col justify-start border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.07)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.12)] transition-all duration-300 min-h-[340px]"
            >
              {/* CARD TITLE (2 LINES ITALIC BOLD) */}
              <h3 className="text-[22px] sm:text-[24px] md:text-[26px] font-bold italic text-[#111111] leading-[1.08] sm:leading-[1.1] mb-3">
                <span className="block">{item.titleLine1}</span>
                <span className="block">{item.titleLine2}</span>
              </h3>

              {/* TECH STACK SUBTITLE */}
              <p className="text-[13.5px] sm:text-[14px] font-bold text-[#111111] mb-5 leading-normal">
                {item.stack}
              </p>

              {/* DESCRIPTION PARAGRAPH */}
              <p className="text-[13.5px] sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseAcrossPlatform;
