import React from 'react'
import Image from 'next/image'
import LeftConsultImg from '../../../../../components/Images/callcenter2.jpg' // Professional guy on phone
import RightConsultImg from '../../../../../components/Images/callcenter.jpg' // Background team/office

const CallCenterConsulting = () => {
    const languages = ["ENGLISH", "URDU", "HINDI", "PUNJABI"]

    return (
        <section className="py-24 bg-white font-sans -mt-30">
            <div className="max-w-[1180px] mx-auto px-6">

                {/* Languages Support Section */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-[#232323] text-white px-4 py-2  shadow-[0_9px_3px_rgba(0,0,0,0.26)] mb-12">
                        <h3 className="text-[15px] tracking-tight ">Languages We Support</h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {languages.map((lang, idx) => (
                            <div
                                key={idx}
                                className="px-8 mx-6 py-4 border-2 border-[#41B349] rounded-2xl text-[20px] font-bold text-[#232323] bg-[#41B3490D] 
                                cursor-default"
                            >
                                {lang}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Free Consulting Section */}
                <div className="text-center mb-10 ">
                    <div className="inline-block bg-[#232323] text-white px-4 py-2 shadow-[0_9px_3px_rgba(0,0,0,0.26)] mb-8">
                        <h3 className="text-[15px] ">Get your free consulting</h3>
                    </div>
                    <p className="max-w-[500px] mx-auto text-gray-600 leading-relaxed text-[16px]">
                        Unlock your business’s potential with our <span className="font-bold text-[#232323]">free consulting services</span>. Receive expert guidance and tailored strategies designed to help your brand grow, succeed, and thrive in the UAE and global markets.
                    </p>
                </div>

                {/* Side-by-Side Divs Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 mb-24">
                    {/* Left Div: Professional Guy */}
                    <div className="relative h-[350px]  md:h-[500px]  overflow-hidden  items-center flex justify-center">
                        <Image
                            src={LeftConsultImg}
                            alt="Professional Consultation"
                            layout="fill"
                            className="object-contain p-0"
                        />
                    </div>

                    {/* Right Div: Team/Office with Overlay and Text */}
                    <div className="relative h-[350px] md:h-[500px] max-w-[1000px] overflow-hidden">
                        <Image
                            src={RightConsultImg}
                            alt="Our Team"
                            layout="fill"
                            className="object-cover"
                        />
                        {/* Dark Overlay for readability */}
                        <div className="absolute inset-0 bg-[#23275c]/70 flex flex-col justify-center px-10 md:px-12 text-white">
                            <h2 className="text-[30px] md:text-[40px] font-bold leading-tight uppercase mb-4">
                                Seamless Bond Of <br />
                                Better Customer <br />
                                Satisfaction
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Our Great Team Description */}
                <div className="text-left max-w-[1000px] mx-2 -mt-10 -mb-15 font-sans ">
                    <h2 className="text-[32px] md:text-[22px]  font-bold text-[#232323] mb-9 uppercase">Our Great Team</h2>
                    <p className="text-gray-600 leading-relaxed text-[16px] mb-6">
                        Our call center is powered by a team of dedicated professionals with extensive experience and a passion for delivering exceptional customer service. Trained to handle a wide range of inquiries efficiently and empathetically, they ensure every interaction is positive, productive, and leaves a lasting impression.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                        Whether troubleshooting issues, providing information, or assisting with orders, our team is available 24/7, supporting your customers in the UAE and globally with consistency, professionalism, and care.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default CallCenterConsulting
