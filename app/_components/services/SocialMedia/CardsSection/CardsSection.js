import React from "react";
import FacebookIcon from "../../../../../components/Images/fbicon.png";
import InstagramIcon from "../../../../../components/Images/instaicon.png";
import ThreadIcon from "../../../../../components/Images/threadicon.png";
import LinkedInIcon from "../../../../../components/Images/linkedinicon.png";
import PinterestIcon from "../../../../../components/Images/pinteresticon.png";
import TwitterIcon from "../../../../../components/Images/twittericon.png";
import BackgroundDeco from "../../../../../components/Images/smcardsbg.png";
import Image from "next/image";

const CardsSection = () => {
  const Services = [
    {
      img: FacebookIcon,
      title: "Facebook ",
      desc: "Facebook is a social networking platform that connects people worldwide, allowing them to share updates, photos, and messages. It also offers businesses tools for advertising and engaging with their audience.",
    },
    {
      img: InstagramIcon,
      title: "Instagram",
      desc: "Instagram is a photo and video-sharing social media platform that allows users to share visual content and connect with others. It's popular for its filters, stories, and a focus on visual storytelling.",
    },
    {
      img: ThreadIcon,
      title: "Thread",
      desc: "Threads is a social media app by Instagram designed for sharing text updates and joining public conversations. It allows users to follow and interact with their favorite creators and friends in a focused, text-centric environment.",
    },
    {
      img: LinkedInIcon,
      title: "Linked",
      desc: "LinkedIn is a professional networking platform that connects job seekers, professionals, and businesses. It facilitates career development, recruitment, and business networking through profile sharing, job postings, and industry news.",
    },
    {
      img: PinterestIcon,
      title: "Pinterest",
      desc: "Pinterest is a visual discovery and bookmarking platform where users can find and save ideas on various topics like recipes, fashion, and home decor. It allows users to create and organize virtual pinboards for inspiration and planning.",
    },
    {
      img: TwitterIcon,
      title: "Twitter",
      desc: "Twitter is a social media platform where users post and interact with short messages called tweets. It's known for real-time updates, trending topics, and facilitating public conversations on a wide range of subjects.",
    },
  ];
  return (
    <div>
      <section className="w-full py-12 -mb-10 relative overflow-hidden">
        <div
          style={{ backgroundImage: `url(${BackgroundDeco.src})` }}
          className="absolute inset-0 bg-cover bg-center bg-[#41b349] bg-repeat-y blur-sm scale-105 w-full h-full "
        ></div>

        {/* CARDS SECTION */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3  gap-6 max-w-[1140px] mx-auto px-5">
            {Services.map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-black p-5 text-center rounded-xl "
                style={{ boxShadow: "0 0 10px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
                <h2 className="text-[25px] font-semibold mb-3 ">
                  {item.title}
                </h2>

                <p className="text-[#6D6D6D] text-[16px] leading-[26px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

      </section>
    </div>
  );
};

export default CardsSection;
