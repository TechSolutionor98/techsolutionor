import React from 'react'
import Image from 'next/image'
import POSHeroImg from '../../../components/Images/posbanner.png'
import POSBgImg from '../../../components/Images/posbgbanner.png'

const POSHero = () => {
    return (
        <section
  className="relative w-full min-h-[400px] flex items-center overflow-hidden font-sans"
//   style={{
//     backgroundImage: `url(${POSBgImg.src})`,
//     backgroundSize: 'cover',
//     backgroundSize: 'contain',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'repeat',
//   }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-[#222222]/90 z-0"></div>
            <div className="relative z-10 max-w-[1180px] mx-auto px-6 py-8 md:py-15 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                {/* Left Text Content */}
                <div className="w-full md:w-[60%] text-white text-center md:text-left">
                    <h1 className="text-[25px] sm:text-[30px] lg:text-[40px] tracking-wide font-bold leading-[1.2] mb-8">
                        Custom POS Software <br />
                        Development for Sales & <br />
                        Business Growth
                    </h1>

                    <p className="text-gray-300 text-[16px] md:text-[18px] max-w-[580px] tracking-wide text-justify mb-12 leading-relaxed">
                        Designed to streamline transactions and simplify inventory management,
                        our custom POS software delivers real-time insights to support smarter
                        business decisions. Improve customer experience, increase operational
                        efficiency, and accelerate sales growth with our advanced, scalable
                        POS solutions tailored for modern businesses.
                    </p>

                    <button className="bg-[#41B349] hover:bg-white hover:text-black text-white px-8 py-2 text-[15px] font-semibold transition-all duration-300 shadow-lg">
                        Free Qoute
                    </button>
                </div>

                {/* Right Image Section */}
                <div className="w-full md:w-[40%] flex justify-center md:justify-end">
                    <div className="relative w-full max-w-[500px] 0">
                        <Image
                            src={POSHeroImg}
                            alt="POS Development"
                            priority
                            layout="responsive"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default POSHero
