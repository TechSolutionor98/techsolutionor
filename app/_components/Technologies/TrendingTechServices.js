'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowDownLong } from "react-icons/fa6"

// Assets from Navbar.js and Technology.js context

// logo
import Swift from '../../../components/Images/swift2.png'
import Reactjs from '../../../components/Images/react2.png'
import JavaScript from '../../../components/Images/JavaScript.png'
import PHP from '../../../components/Images/php-1-1.png'
import Laravel from '../../../components/Images/Laravel.png'
import Python from '../../../components/Images/py2.png'
import Wp from '../../../components/Images/wpicon2.png'
import Shopfiy from '../../../components/Images/shopifyicon2.png'
import Css from '../../../components/Images/cssicon2.png'
import Magento from '../../../components/Images/magentoicon2.png'
import Flutter from '../../../components/Images/Fluttericon-2.png'
import Figma from '../../../components/Images/Figmaicon2.png'
import Meta from '../../../components/Images/Metaicon2.png'
import Analytics from '../../../components/Images/google-Analyticsicon2.png'
import GoogleAds from '../../../components/Images/Google-Adsicon2.png'
import Html from '../../../components/Images/htmlicon2.png'
import Net from '../../../components/Images/net.png'
import Angular from '../../../components/Images/Angularicon2.png'
import CPlus from '../../../components/Images/c2.png'
import Go from '../../../components/Images/go2.png'
import Techbg from '../../../components/Images/techbg.png'

// background images 
import RectBg1 from '../../../components/Images/reactangle1.png'
import RectBg2 from '../../../components/Images/reactangle2.png'
import RectBg3 from '../../../components/Images/JavaScript-bg.png'
import RectBg4 from '../../../components/Images/php-bg.png'
import RectBg5 from '../../../components/Images/Laravel-bg.png'
import RectBg6 from '../../../components/Images/reactangle6.png'
import RectBg7 from '../../../components/Images/wordpress-bg.png'
import RectBg8 from '../../../components/Images/shopify-bg.png'
import RectBg9 from '../../../components/Images/CSS-bg.png'
import RectBg10 from '../../../components/Images/magento-bg.png'
import RectBg11 from '../../../components/Images/Flutter-bg.png'
import RectBg12 from '../../../components/Images/Figma-bg.png'
import RectBg13 from '../../../components/Images/Meta-bg.png'
import RectBg14 from '../../../components/Images/google-Analytics-bg.png'
import RectBg15 from '../../../components/Images/Google-Ads-bg.png'
import RectBg16 from '../../../components/Images/reactangle1.png'
import RectBg17 from '../../../components/Images/php-bg.png'
import RectBg18 from '../../../components/Images/Angular-bg.png'
import RectBg19 from '../../../components/Images/reactangle4.png'
import RectBg20 from '../../../components/Images/reactangle5.png'
import Techcard from '../../../components/Images/techcards.png'

const techData = [
    { RectBg: RectBg5, bg: Techbg, Image: Laravel, label: 'Laravel', href: '/technologies/laravel', desc: 'Laravel is a powerful PHP framework for building secure and scalable web applications. Our Laravel development services create custom backend systems, enterprise platforms, and high-performance web solutions with clean architecture.' },
    { RectBg: RectBg3, bg: Techbg, Image: JavaScript, label: 'JavaScript', href: '/technologies/javascript', desc: 'JavaScript powers dynamic and interactive web experiences. Our JavaScript development services build responsive websites, scalable web applications, and custom frontend solutions optimized for performance and user engagement.' },
    { RectBg: RectBg2, bg: Techbg, Image: Reactjs, label: 'React JS', href: '/technologies/react', desc: 'React is a leading JavaScript library for building fast, interactive user interfaces. Our React development services deliver scalable single-page applications (SPAs), custom web apps, and enterprise frontend solutions optimized for performance and maintainability.' },
    { RectBg: RectBg6, bg: Techbg, Image: Python, label: 'Python', href: '/technologies/python', desc: 'Python is a versatile programming language ideal for web development and advanced technologies. Our Python development services deliver scalable backend systems, AI solutions, automation tools, and high-performance web applications.' },
    { RectBg: RectBg1, bg: Techbg, Image: Swift, label: 'Swift', href: '/technologies/swift', desc: 'Swift is a powerful programming language for building high-performance Apple applications. Our Swift development services help businesses create secure, scalable apps for iOS, macOS, watchOS, and tvOS with seamless user experience and optimized performance.' },
    { RectBg: RectBg4, bg: Techbg, Image: PHP, label: 'PHP', href: '/technologies/php', desc: 'PHP is a reliable server-side scripting language for dynamic web applications. Our PHP development services deliver secure, scalable, and custom backend solutions tailored to business requirements.' },
    { RectBg: RectBg7, bg: Techbg, Image: Wp, label: 'Wordpress', href: '/technologies/wordpress', desc: 'WordPress is a flexible content management system for modern websites. Our WordPress development services create SEO-optimized, scalable business websites, blogs, and eCommerce platforms with custom functionality.' },
    { RectBg: RectBg8, bg: Techbg, Image: Shopfiy, label: 'Shopify', href: '/technologies/shopify', desc: 'Shopify is a leading eCommerce platform for online stores. Our Shopify development services build secure, high-converting, and scalable eCommerce websites with custom themes and seamless payment integration.' },
    { RectBg: RectBg9, bg: Techbg, Image: Css, label: 'CSS', href: '/technologies/css', desc: 'CSS enhances the visual design and responsiveness of websites. Our CSS development services create modern, responsive, and user-friendly interfaces optimized for performance and cross-device compatibility.' },
    { RectBg: RectBg10, bg: Techbg, Image: Magento, label: 'Magento', href: '/technologies/magento', desc: 'Magento is an enterprise-level eCommerce platform for scalable online stores. Our Magento development services deliver high-performance, customizable, and feature-rich eCommerce solutions for growing businesses.' },
    { RectBg: RectBg11, bg: Techbg, Image: Flutter, label: 'Flutter', href: '/technologies/flutter', desc: 'Flutter is a cross-platform framework for high-performance mobile apps. Our Flutter development services create scalable Android and iOS applications from a single codebase with smooth UI and native-like performance.' },
    { RectBg: RectBg12, bg: Techbg, Image: Figma, label: 'Figma', href: '/technologies/figma', desc: 'Figma is a powerful UI/UX design tool for modern digital products. Our Figma design services deliver interactive prototypes, responsive interfaces, and conversion-focused user experiences.' },
    { RectBg: RectBg13, bg: Techbg, Image: Meta, label: 'Meta', href: '/technologies/meta', desc: 'Meta powers advanced social and digital technologies. Our Meta-focused marketing and development solutions help businesses build brand visibility, engagement, and scalable digital growth strategies.' },
    { RectBg: RectBg14, bg: Techbg, Image: Analytics, label: 'Analytics', href: '/technologies/analytics', desc: 'Analytics tools help businesses make data-driven decisions. Our analytics services implement advanced tracking, reporting, and performance optimization solutions to drive measurable business growth.' },
    { RectBg: RectBg15, bg: Techbg, Image: GoogleAds, label: 'Google Ads', href: '/technologies/google-ads', desc: 'Google Ads is a powerful digital advertising platform. Our Google Ads management services create targeted, high-converting campaigns that increase traffic, leads, and return on investment.' },
    { RectBg: RectBg16, bg: Techbg, Image: Html, label: 'HTML', href: '/technologies/html', desc: 'HTML is the foundation of modern websites. Our HTML5 development services ensure clean, structured, responsive, and SEO-friendly web pages that work seamlessly across all devices and browsers.' },
    { RectBg: RectBg17, bg: Techbg, Image: Net, label: '.NET Framework', href: '/technologies/dotnet', desc: '.NET is a robust Microsoft framework for enterprise applications. Our .NET development services build secure, scalable web, desktop, and cloud-based solutions optimized for performance and modern architecture.' },
    { RectBg: RectBg18, bg: Techbg, Image: Angular, label: 'Angular', href: '/technologies/angular', desc: 'Angular is a TypeScript-based framework for building scalable and dynamic web applications. Our Angular development services deliver high-performance SPAs, custom business platforms, and enterprise-grade solutions optimized for speed, security, and maintainability.' },
    { RectBg: RectBg19, bg: Techbg, Image: CPlus, label: 'C++', href: '/technologies/CPlus', desc: 'Angular is a TypeScript-based framework for building scalable and dynamic web applications. Our Angular development services deliver high-performance SPAs, custom business platforms, and enterprise-grade solutions optimized for speed, security, and maintainability.' },
    { RectBg: RectBg20, bg: Techbg, Image: Go, label: 'Go', href: '/technologies/angular', desc: 'Angular is a TypeScript-based framework for building scalable and dynamic web applications. Our Angular development services deliver high-performance SPAs, custom business platforms, and enterprise-grade solutions optimized for speed, security, and maintainability.' },
];

const TrendingTechServices = () => {
    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount(techData.length);
    }

    return (
        <div id='Techonolgies' className="w-full bg-white">
            <div className="tect-bottom flex flex-col items-center justify-center pb-10">
                <div className="cards z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-center place-items-center max-w-[1100px] mx-auto px-5 -mt-8 pb-10">
                    {techData.slice(0, visibleCount).map((item, i) => (
                        <Link key={i} href={item.href}>
                            <div
                                className="card w-[320px] h-[350px] relative rounded-[29px] bg-white
                                transition-all duration-300 ease-in hover:scale-105 hover:shadow-2xl cursor-pointer shadow-lg group
                                "
                                style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)' }}
                            >
                                <div className="images-top relative h-[146px] rounded-t-[29px] overflow-hidden">
                                    <Image src={item.RectBg} alt='Cardbg' width={320} height={146} className='w-full h-full object-contain' />
                                    <Image src={Techcard} alt='Cardbg' className='w-full absolute border-b h-full top-0 left-0 z-10 ' width={320} height={146} />
                                </div>
                                <div className="bottom-data flex flex-col items-center text-center px-6 pb-6 mt-[-60px] relative z-20">
                                    <div className="">
                                        <Image src={item.Image} alt={item.label} width={500} height={500} className='w-[100px] h-[100px] object-contain' />
                                    </div>
                                    <h1 className='text-[22px] font-[700] mb-2 text-black '>{item.label}</h1>
                                    <p className='text-[12px] leading-[18px] text-gray-600 '>{item.desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {visibleCount < techData.length && (
                    <div className="explore-more mt-10">
                        <button
                            onClick={handleLoadMore}
                            className='relative overflow-hidden gap-3 bg-[#41B349] text-white h-[45px] px-8 flex items-center justify-center text-[16px] font-[600] rounded-full border border-[#41B349] hover:bg-white hover:text-[#41b349] transition-all duration-300 cursor-pointer group shine-btn '
                        >
                            Explore More <FaArrowDownLong className='mt-0.5 font-bold' />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrendingTechServices
