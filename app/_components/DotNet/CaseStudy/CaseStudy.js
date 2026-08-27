import React from 'react'
import WebApps from '../../../../components/Images/webapps.png'
import APIs from '../../../../components/Images/API.png'
import RealTime from '../../../../components/Images/RealTime.png'
import Image from 'next/image'

const CaseStudy = () => {
    const Cards = [
        { icon: WebApps, title: 'Web Applications', desc: 'Nanotechnology immersion along the information highway will close the loop on focusing solely.' },
        { icon: APIs, title: 'APIs', desc: 'Podcasting operational change management inside of workflows to establish a framework.' },
        { icon: RealTime, title: 'Real Time', desc: 'Dynamically innovate resource-leveling customer service for state of the art customer service.' },
    ]
    return (
        <div className='flex items-center justify-center gap-10 px-10 py-20 bg-[#f7f7f7]'>
            {Cards.map((card, index) => (
                <div key={index} className='group px-10 py-10 flex flex-col w-[370px] border border-[#dcdcdc] rounded-[20px]'>
                    <div className="upper-div flex items-center justify-between w-full">
                        <div className="left-case-study w-[100px] h-[100px] flex items-center justify-center rounded-full transition duration-300 ease-in-out group-hover:bg-[#FDE851] group-hover:text-white">
                            <Image
                                alt='Web Apps'
                                src={card.icon}
                                width={1000}
                                height={1000}
                                className='w-[50px] h-[50px] md:w-[50px] md:h-[50px] transition duration-300 ease-in-out group-hover:filter group-hover:invert'
                            />
                        </div>
                        <p>CASE STUDY</p>
                    </div>
                    <div className="right-case-study flex flex-col items-start gap-5 md:basis-[50%] mt-10">
                        <h1 className='text-[24px] font-[500] leading-[38px] text-[#221F3C]'>{card.title}</h1>
                        <p className='text-[16px] font-[300] leading-[30px]'>{card.desc}</p>
                        {/* <button className='bg-[#ffd600] w-[153px] h-[49px] flex items-center justify-center text-black hover:text-white duration-300 transition ease-in-out text-[14px] font-[700]'>LEARN MORE</button> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CaseStudy
