import React from 'react'
import LaravelBg from '../../../../components/Images/reactbg.jpg'

const ReactBanner = () => {
  return (
    <div className='w-full h-[50vh] md:h-[100vh] relative flex items-center justify-center text-white px-5 md:px-0' style={{ backgroundImage: `url(${LaravelBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="text-area flex flex-col w-[550px] md:absolute left-20">
        <h1 className='text-[35px] font-[700] leading-[42px] text-[#41b349]'>Building Dynamic User <br className='hidden md:block' /> Interfaces</h1>
        <p className='text-[15px] leading-[28px] mt-5 text-justify text-[#bed9da]'>React is a popular JavaScript library for creating fast, interactive, and reusable user interfaces, making it a top choice for modern web development.</p>
      </div>
    </div>
  )
}

export default ReactBanner
