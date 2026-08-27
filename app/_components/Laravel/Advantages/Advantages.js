import React from 'react'

function Advantages() {
  const advantagesData = [
    {
      title: 'Clean and Readable Syntax',
      desc: "Laravel's expressive and clean syntax improves developer productivity, making code easier to write, understand, and maintain.",
    },
    {
      title: 'Extensive Ecosystem',
      desc: 'Laravel provides a rich ecosystem of tools such as Laravel Forge, Vapor, Horizon, and Nova, enabling faster development, deployment, and monitoring.',
    },
    {
      title: 'Strong Community Support',
      desc: 'Laravel has a large and active global community, offering extensive documentation, tutorials, packages, and ongoing updates, ensuring long-term support and innovation.',
    },
  ]

  return (
    <section className='w-full bg-white px-5 py-14 md:px-10 lg:px-16'>
      <div className='mx-auto w-full max-w-[1180px]'>
        <div className='flex justify-center'>
          <h2 className='bg-[#41B349] px-7 py-2 text-center text-[34px] font-[700] leading-[1.1] text-white md:text-[38px]'>
            Advantages
          </h2>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {advantagesData.map((item, idx) => (
            <article
              key={idx}
              className='min-h-[225px] rounded-[20px] border border-[#bfbfbf] bg-white px-8 py-7 text-center shadow-[0_2px_10px_rgba(0,0,0,0.15)]'
            >
              <h3 className='text-[19px] font-[700] leading-[1.2] text-[#1f1f1f]'>
                {item.title}
              </h3>
              <p className='mt-5 text-[15px] font-[400] leading-[1.85] text-[#1f1f1f]'>
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages
