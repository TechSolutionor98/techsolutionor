import React from 'react'
import AboutSocialMedia from '../../../../../components/Images/smabout.jpg'
import Image from 'next/image'

const SocialMediaGrowth = () => {
  return (
    <div>
      <div className="relative w-full bg-white mt-5 md:-mt-15  flex justify-center items-center">
              <div className=" max-w-[1140px] mx-auto px-6 md:px-5  py-10 md:py-5 flex flex-col md:flex-row items-start md:items-center gap-5">
                <div className="w-full md:w-1/2 md:mt-10 md:ml-4  flex flex-col gap-5 md:gap-6">
                  <span
                    className="uppercase text-white md:w-[120px] shadow-black bg-[#41b349] px-0 py-2 text-center">
                    What We Do
                  </span>
                  <h2 className="uppercase  text-[20px]  md:text-[40px] font-[700]  font-[sans-serif] leading-tight">
                    Your Partner in Social Media Growth
                  </h2>
      
                  <p className="text-[15px] text-justify max-w-[800px]">
                    Explore our comprehensive suite of social media marketing services designed to connect your brand with your target audience and achieve your business goals. Our mission is to turn your social media presence into a success story.
                  </p>
                  <ul className="list-disc pl-5 ">
                    <li>Developing and executing data-driven strategies</li>
                    <li>Take your brand to new heights by creating compelling content</li>
                    <li>Designed to connect your brand with your target audience</li>
                  </ul>
                </div>
                <div className="md:flex w-full md:w-1/2 mt-[43px] flex md:relative md:mb-20 justify-center md:justify-end relative md:right-[70px]">
                  <Image
                    src={AboutSocialMedia}
                    alt="Mobile App Services"
                    width={1000}
                    height={1000}
                    className="w-full max-w-[350px] object-contain"
                  />
                </div>
              </div>

            </div>

            <div className="w-full mt-5 mb-20">
      <div className="relative z-10 max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
          {/* LEFT — HEADING */}
          <div className="w-full md:w-1/2 font-sans">
          <h2 className='tracking-wide leading-tight font-[700] text-[28px] md:hidden'>Your Social Media Journey Starts Here</h2>
            <h1
              className="hidden md:block tracking-wide leading-tight
          text-[32px] md:text-[45px] font-[700]"
            >
              <span className="block">Your Social Media </span>
              <span className="block">Journey Starts Here</span>
            </h1>
          </div>

          {/* RIGHT — TEXT */}
          <div className="w-full md:w-1/2 font-sanss">
            <p
              className=" max-w-[480px]
          text-md sm:text-base leading-[35px] text-[#6D6D6D]"
            >
              is your gateway to boosting your online presence. Discover expert tips and strategies to effectively navigate and thrive in the social media landscape. Let’s unlock your potential together!
            </p>
          </div>
        </div>
      </div>
    </div>
            
  
    </div>
  )
}

export default SocialMediaGrowth
