import React from 'react'
import Image from 'next/image'
import LaptopImg from '../../../components/Images/poscard1.png'
import Image2 from '../../../components/Images/poscard2.png'
import Image3 from '../../../components/Images/poscard3.png'
import Image4 from '../../../components/Images/poscard4.png'
import Image5 from '../../../components/Images/poscard5.png'

const POSKeyBenefits = () => {
    const benefits = [
        {
            image:LaptopImg,
            title: "Drawer Log Feature",
            desc: "The Manage Drawer Log feature in our POS system allows business owners to track and manage cash drawer activities efficiently. Every transaction, including cash-ins and cash-outs, is recorded with timestamps, ensuring full transparency and accountability."
        },
        {
            image:Image2,
            title: "Manage Purchase Feature",
            desc: "The Manage Purchase feature in our POS system streamlines the procurement process, allowing businesses to efficiently track and manage all purchasing activities. This tool provides a detailed overview of purchase orders, vendor details."
        },
        {
            image:Image3,
            title: "Manage Stock Feature",
            desc: "The Manage Stock feature in our POS system empowers businesses to effectively oversee their inventory with precision. This feature provides real-time updates on stock levels, allowing users to track item availability, set reorder points, and prevent stockouts."
        },
        {
            image:Image4,
            title: "Manage Users Feature",
            desc: "The Manage Users feature in our POS system allows businesses to efficiently control and monitor user access within the system. This feature enables the creation and management of user profiles, assigning specific roles and permissions to ensure that each employee."
        },
        {
            image:Image5,
            title: "Products Management Feature",
            desc: "The Products Management feature in our POS system simplifies the process of managing your entire product catalog. It allows businesses to easily add, edit, and organize products with detailed descriptions, pricing, and inventory levels."
        }
    ];

    return (
        <section className=" bg-white font-sans">
            <div className="max-w-[1130px] mx-auto px-6">
                <h2 className="text-[32px] md:text-[35px] font-bold text-center  mb-10">
                    Key Benefits You’ll Get with <br />
                    Our POS Software
                </h2>

                {/* First Row: 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {benefits.slice(0, 3).map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-[#111111] p-2 pb-10 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300">
                            <div className="bg-gray-50  overflow-hidden mb-6 max-w-[600px] aspect-video relative">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    layout="fill"
                                    // objectFit="contain"
                                    objectFit="cover"
                                    className="p-0"
                                />
                            </div>
                            <div className="flex justify-center mb-6">
                                <span className=" inline-block bg-[#262323] text-white font-semibold text-[14px] leading-[14px] px-6 py-[12px] h-[38px] tracking-normal text-center transition-all duration-300 cursor-pointer shadow-[5px_6px_6px_0px_rgba(65,179,73,0.36)] rounded-[1px]">
                                    {item.title}
                                    </span>
                            </div>
                            <p className="text-gray-600  text-[17px] text-justify leading-relaxed flex-grow">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>


                {/* Second Row: 2 cards centered */}
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    {benefits.slice(3, 5).map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-[#111111] p-2 pb-10 shadow-sm flex flex-col  hover:shadow-md transition-all duration-300 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                            <div className="bg-gray-50  overflow-hidden mb-6 max-w-[600px] aspect-video relative">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="p-0"
                                />
                            </div>
                            <div className="flex justify-center mb-6">
                                <span className=" inline-block bg-[#262323] text-white font-semibold text-[14px] leading-[14px] px-6 py-[12px] h-[38px] tracking-normal text-center transition-all duration-300 cursor-pointer shadow-[5px_6px_6px_0px_rgba(65,179,73,0.36)] rounded-[1px]">
                                    {item.title}
                                </span>
                            </div>
                            <p className="text-gray-600  text-[17px] text-justify leading-relaxed flex-grow">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default POSKeyBenefits
