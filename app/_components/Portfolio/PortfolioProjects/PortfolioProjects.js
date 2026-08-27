import React from 'react'
import Image from 'next/image'
import p1 from '@/components/Images/portfolioimg1.png'
import p2 from '@/components/Images/portfolioimg2.png'
import p3 from '@/components/Images/portfolioimg3.png'
import p4 from '@/components/Images/portfolioimg4.png'

const projects = [
    {
        title: 'Grabatoz',
        description: 'Grabatoz Is An E-Commerce Platform in Dubai, UAE offering a Variety of Electronics and IT Products. It focucses on Customer Satisfaction And Innovative Solutions To Meet Diverse Technology Needs.',
        image: p1,
        imageLeft: true
    },
    {
        title: 'Baytalprotien',
        description: 'Baytal Protien offer a range of Nutritainal Supplements and fitness Accessories. Their Product Include Various Amino Acids, Protien Powders and other workout supplements, Through many items are frequently out of stock. The site also features accessories like protiens belts, Elbows waps, and lifting straps.',
        image: p2,
        imageLeft: false
    },
    {
        title: 'Clixpos',
        description: 'ClixPOS provides innovative Point of Sale (POS) solutions tailored for various business types, including retail, restaurants, cafes, and salons. Their systems streamline transactions, boost efficiency, and enhance customer experiences with a user-friendly interface and 24/7 support.',
        image: p3,
        imageLeft: true
    },
    {
        title: 'Just Appliances',
        description: 'Just Appliances LLC offers expert home appliance repair services in the Greater Seattle area. Their skilled technicians handle a wide range of appliances, including refrigerators, washers, dryers, and more, ensuring efficient and reliable solutions for all repair needs.',
        image: p4,
        imageLeft: false
    }
]

const PortfolioProjects = () => {
    return (
        <div className="pt-25 ">
  <div className="w-full -space-y-10">
    {projects.map((project, index) => (
      <div
        key={index}
        className={`flex flex-col md:flex-row items-stretch gap-6  ${
          project.imageLeft ? '-mt-30' : 'md:flex-row-reverse lg:-mt-40 '
        }`}
      >
        {/* IMAGE SIDE – FULL EDGE */}
        <div className="w-full md:w-1/2">
          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT SIDE */}
        <div className="w-full md:w-1/2 px-0 md:px-2 flex flex-col justify-center mb-50 item-center ">
          <h2 className="text-4xl md:text-[40px] text-center font-bold text-gray-800 mb-10">
            {project.title}
          </h2>
          <p className="text-[14px] text-gray-600 leading-relaxed text-justify">
            {project.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
    )
}

export default PortfolioProjects
