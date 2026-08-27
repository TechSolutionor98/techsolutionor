import React from 'react'
import BgInnovation from '../../../../../components/Images/innovationideabg.jpg'
import Image from 'next/image'

const InnvoationIdea = () => {
  return (
    <div 
    style={{ backgroundImage: `url(${BgInnovation.src})` }}
    className='w-full bg-cover bg-center bg-[#262323] '>
      <div 
      
      className="relative z-10 max-w-[1140px] mx-auto px-5 lg:pl-10 md:px-16 py-12 md:py-14 flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="w-full md:w-1/2 text-white mb-0">

         <button className=" bg-white text-[#262323] tracking-tight px-4 py-2 font-medium border  transition duration-300 ">
            Innvoation Idea
          </button>
          <h1
            className="font-bold tracking-wide leading-tight
              text-[36px]
              sm:text-[36px]
              md:text-[40px]"
          >
            " IT TechSolutionor, we drive innovation by creating cutting-edge software solutions that stay ahead of future trends."
          </h1>
        </div>
        </div>
    </div>
  )
}

export default InnvoationIdea
