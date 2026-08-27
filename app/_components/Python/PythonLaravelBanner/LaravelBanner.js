import React from 'react'
import LaravelBg from '../../../../components/Images/pythonbg.jpg'

const PythonBanner = () => {
  return (
    <div className='w-full h-[50vh] md:h-[100vh] relative flex items-center justify-center text-white px-5 md:px-0' style={{backgroundImage: `url(${LaravelBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center'} }>
      {/* <div className="text-area flex flex-col w-[550px] md:absolute right-20">
        <h1 className='text-[35px] font-[700] leading-[42px]'>Elegant Web Applications <br className='hidden md:block'/> with <br className='block md:hidden'/> PHP</h1>
      <p className='text-[15px] leading-[28px] mt-5 text-justify'>Laravel is a leading PHP framework known for its elegant syntax and powerful tools. It simplifies web development with features like MVC architecture, routing, and Blade templating, making it perfect for creating robust and scalable applications.</p>
      </div> */}
    </div>
  )
}

export default PythonBanner
