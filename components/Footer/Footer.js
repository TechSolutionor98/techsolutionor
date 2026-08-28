import React from 'react'
import Map from '@/src/Components/Images/map.png'
import Image from 'next/image'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
const Footer = () => {
    const footerLinks = {
        "Technologies": [
            "SWIFT Network",
            "React Development",
            "Python Development",
            "HTML Development",
            "Laravel Developement",
            "Go Development",
            "C++ Development",
            "Wordpress Development",
            "PHP Development",
            "Shopify Development",
            "Angular Development",
            "Jawascript Developement"
        ],
        "Services": [
            "App Developement",
            "Web Developement",
            "Software Developement",
            "POS Developement",
            "Ecommerce Development",
            "Graphic Designing",
            "UI/UX Designing",
            "Social Media Marketing",
            "Digital Marketing",
            "PPC And Amazon Ads",
            "Search Engine Optimization",
            "Content Writing"
        ],
        "Industries": [
            "SAAS",
            "Finance",
            "B2B & B2C",
            "Healthcare",
            "Education",
            "Retail & E-commerce",
            "Manufacturing",
            "Non-profit & NGOs",
            "Automotive"
        ],
        "Company": [
            "About Us",
            "Contact Us",
            "Privacy Policy",
            "Terms and Conditions",
            "Blogs",
            "Our Projects",
            "Career",
            "Become a Partner"
        ]
    }
    return (
        <div className='w-full bg-black text-white '>
            {/* Top Section */}
                <div className="grid grid-cols-2 md:flex items-start justify-center gap-10 md:gap-15 px-10 py-10">
                {Object.entries(footerLinks).map(([section, links]) => (
                    <div key={section} className="footer-section">
                        <h2 className="text-[22px] text-[#40b348] font-[600] mb-4">{section}</h2>
                        <ul className="space-y-2">
                            {links.map((link, index) => (
                                <li key={index} className="text-[16px] font-[400] hover:text-[#40b348]  cursor-pointer block transition ease-in-out duration-200 ">{link}</li>
                            ))}
                        </ul>
                </div>
            ))}
            </div>
            {/* Bottom Section */}
            <div className="flex flex-col items-center justify-center gap-10 pb-10">
                <p className="text-[20px] md:text-[40px] font-[600]">We'd Love To Hear From You</p>
                <Image src={Map} alt="Map" width={1024} height={300} className='' />
            </div>
            <div className="emaillinks flex items-center justify-center pb-10 w-full">
                <form action="" className='flex flex-col md:flex-row gap-5 w-full md:w-auto px-10 md:px-10 lg:px-10'>
                    <input type="text" className='h-[43px] w-full md:flex-1 lg:w-[180px] bg-white text-[#000] px-[14px] outline-0 border border-transparent focus:border-[#066AAb] transition-all duration-200' placeholder='Name' />
                    <input type="email" className='h-[43px] w-full md:flex-1 lg:w-[180px] bg-white text-[#000] px-[14px] outline-0 border border-transparent focus:border-[#066AAb] transition-all duration-200' placeholder='Email' />
                    <input type="text" className='h-[43px] w-full md:flex-1 lg:w-[180px] bg-white text-[#000] px-[14px] outline-0 border border-transparent focus:border-[#066AAb] transition-all duration-200' placeholder='Website URL' />
                     <select name="services" id="services" className='h-[43px] w-full md:flex-1 lg:w-[180px] bg-white text-[#6d6d6d] px-[14px] border border-transparent focus:border-[#066AAb] transition-all duration-200'>
                        <option value="services"  >Select Services</option>
                        <option value="App Developement">App Developement</option>
                        <option value="Web Developement">Web Developement</option>
                        <option value="Software Developement">Digital Marketing</option>
                        <option value="POS Developement">Graphics Designing</option>
                    </select>
                    <button className='lg:w-[120px] md:w-[120px] h-[41px] bg-[#066AAb] flex  items-center justify-center rounded-[3px]'>Submit</button>
                </form>
            </div>
            <div className='flex items-center justify-center'>
                <hr className='w-[80%] h-[1px] text-white bg-white '/>
            </div>
            {/* Social & Contact Section */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full px-20 py-8 gap-5 md:gap-20 md:pl-25">
                {/* Social Icons */}
                <div className="flex items-center gap-3">
                    <FaFacebookF className='text-[25px] p-1 rounded-full border hover:bg-[#066AAb]   cursor-pointer transition ease-in-out duration-200'/>
                    <FaInstagram className='text-[25px] p-1 rounded-full border hover:bg-[#066AAb] cursor-pointer transition ease-in-out duration-200'/>
                    <FaXTwitter className='text-[25px] p-1 rounded-full border hover:bg-[#066AAb] cursor-pointer transition ease-in-out duration-200'/>
                    <FaLinkedin className='text-[25px] p-1 rounded-full border hover:bg-[#066AAb] cursor-pointer transition ease-in-out duration-200'/>
                    <FaPinterest className='text-[25px] p-1 rounded-full border hover:bg-[#066AAb] cursor-pointer transition ease-in-out duration-200'/>
                </div>
                {/* Contact Info */}
                <div className="text-[16] font-[400]">
                    Call now: <span className="">+971 54 3502 460</span>
                </div>
                {/* Copyright */}
                <div className="text-[15px] font-[400] md:text-right">
                    All rights reserved | <span className="font-bold">TECH SOLUTIONOR</span>
                </div>
            </div>
        </div>
    )
}

export default Footer

