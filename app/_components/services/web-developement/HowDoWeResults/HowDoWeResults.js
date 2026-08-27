import React from 'react'
import Desktop from '../../../../../components/Images/desktop.png'
import Image from 'next/image'
const HowDoWeResults = () => {
  return (
    <div className='bg-[#41b349] w-full flex flex-col items-center justify-center text-white py-20 px-10 md:px-20 gap-10 text-center'>
      <Image alt='Desktop Icon' src={Desktop} width={1000} height={1000} className='w-[332px] h-[282.458px]' />
      <h1 className='text-[17px] font-[600] leading-[30px]'>HOW WE HELP YOU GET RESULTS</h1>
      <p className='text-[16px] leading-[28px]'>Based on your individual needs, we’ll create a fully customized plan to help you boost <br /> your results through tailored web design and development.</p>
      <button className='bg-white text-black' style={{padding: '20px 30px 20px 30px', boxShadow: '0px 5px 7px 0px rgba(255, 255, 255, 0.5)'}}>LET'S TALK IMPACT</button>
    </div>
  )
}

export default HowDoWeResults
