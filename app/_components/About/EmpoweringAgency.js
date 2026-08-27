import React from "react";
import Image from "next/image";
import ICon1 from '../../../components/Images/abouticon1.png'
import ICon2 from '../../../components/Images/abouticon2.png'
import ICon3 from '../../../components/Images/abouticon3.png'

const EmpoweringAgency = () => {
    return (
        <div className="w-full bg-white py-10 md:-pt-25 ">
            <div className="flex flex-col lg:flex-row ">
                {/* Left side: Text Content - No padding on left to be flush with screen */}
                <div className="w-full lg:w-[1200px] bg-white pl-0 pr-5 md:pr-10 lg:pr-16 flex justify-start mb-2">
                    <div className="max-w-[1200px] w-full pl-5 md:pl-10 lg:pl-10 -py-5">
                        <div className="inline-flex items-center gap-2 bg-[#41b349] text-white px-6 py-2  text-[16px] font-semibold mb-2 shadow-md shadow-[#41b349]/30">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                            <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
                        </svg>
                         Expertise you can trust
                        </div>
                        <h2 className="text-[#262323] text-[32px] md:text-[45px] font-bold leading-tight mb-8">
                            A Startup Agency Empowering Young Talent and Innovative Ideas
                        </h2>
                        <div className="space-y-6 text-gray-600 text-base md:text-[15px] leading-relaxed">
                            <p>
                                TechSolutionor is a modern technology agency driven by creativity, innovation, and collaboration. We go beyond traditional approaches to deliver cutting-edge solutions for businesses and individuals alike. <br/>
                                At TechSolutionor, we work like a family, experienced experts handle complex projects with precision, while young talents and interns contribute fresh ideas and innovative perspectives. This blend of experience and creativity makes us one of the most advanced IT hubs globally. <br />
                                We are committed to nurturing the next generation of talent, guiding and inspiring young professionals to grow alongside us while helping clients achieve their vision and business goals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right side: Stats */}
                <div className="w-full lg:w-1/3 flex flex-col justify-start gap-15 px-5 md:px-10 lg:pl-5 mb-15">
                    {/* Stat Item 1 */}
                    <div className="flex items-start gap-2">
                        <div className="p-0  text-[#41b349] text-3xl ">
                            <Image
                                alt="Projects Completed"
                                src={ICon1}
                                width={90}
                                height={90}
                                className="object-contain"/>
                        </div>
                        <div>
                            <h3 className="text-[#41b349] text-2xl md:text-[33px]  font-semibold mb-1">150+ Projects</h3>
                            <p className="text-gray-500  text-[18px] font-medium">We Have Completed</p>
                        </div>
                    </div>

                    {/* Stat Item 2 */}
                    <div className="flex items-start gap-2">
                        <div className="p-0  text-[#41b349] text-3xl ">
                            <Image
                                src={ICon2}
                                alt="Projects Completed"
                                width={90}
                                height={90}
                                className="object-contain"/>
                        </div>
                        <div>
                            <h3 className="text-[#41b349] text-2xl md:text-[33px] font-semibold mb-1">100+</h3>
                            <p className="text-gray-500 text-[18px] font-medium">Customer Satisfaction</p>
                        </div>
                    </div>

                    {/* Stat Item 3 */}
                    <div className="flex items-start gap-2">
                        <div className="p-0  text-[#41b349] text-3xl  ">
                            <Image
                                src={ICon3}
                                alt="Projects Completed"
                                width={90}
                                height={90}
                                className="object-contain"/>
                        </div>
                        <div>
                            <h3 className="text-[#41b349] text-2xl md:text-[33px] font-bold mb-1">90%</h3>
                            <p className="text-gray-500 text-[18px] font-medium">Success Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpoweringAgency;
