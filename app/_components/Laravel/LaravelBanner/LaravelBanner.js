import React from 'react'
import LaravelBg from '../../../../components/Images/laravelbg.jpg'

const LaravelBanner = () => {
  return (
    <div className='w-full h-[50vh] md:h-[88vh] relative flex items-center justify-center text-white px-5 md:px-0' style={{backgroundImage: `url(${LaravelBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center'} }>
      <div className="text-area flex flex-col w-[550px] md:absolute right-18">
        <h1 className='text-[42px] font-[700] leading-[42px]'>Laravel: Powerful PHP<br className='hidden md:block'/> Framework for Web <br className='hidden md:block'/> Applications</h1>
      <p className='text-[16px] leading-[30px] mt-8 text-justify'>Laravel is a leading PHP framework known for its elegant syntax and powerful tools. It simplifies web development with features like MVC architecture, routing, and Blade templating, making it perfect for creating robust and scalable applications.</p>
      </div>
    </div>
  )
}

export default LaravelBanner
