import React from 'react'

const LaravelCards = () => {
    const cards = [
        { title: "RESTful API Development", desc: "Laravel simplifies the creation of RESTful APIs, providing tools for routing, validation, and serialization." },
        { title: "Task Scheduling", desc: "Laravel’s task scheduling feature allows developers to automate routine tasks, such as sending emails or cleaning up databases, without relying on external tools." },
        { title: "Testing and Debugging", desc: "Laravel includes PHPUnit integration and built-in testing capabilities, making it easier to write and run tests for your application." },
        { title: "Scalability", desc: "WordPress is regularly updated and offers numerous plugins to enhance website security." },
    ]
    const cards2 = [
        {title: "Clean Syntax", desc: "Laravel’s expressive syntax allows developers to write code that is both elegant and easy to understand."},
        {title: "Extensive Ecosystem", desc: "Laravel offers a rich ecosystem of tools and packages that extend its functionality, from API development to deployment."},
        {title: "Community Support", desc: "Laravel has a large and active community, providing extensive resources, tutorials, and packages."},
    ]
    return (
        <div className='w-full h-auto  flex flex-col items-center justify-center gap-5 md:gap-5 '>
            <div className='w-full bg-[#181818] md:h-[333px] flex flex-col md:flex-row items-center justify-center gap-5 md:gap-2 py-5 md:py-0 md:justify-between px-5 md:px-20 mt-20' >
                {cards.map((card, idx) => (
                    <div key={idx} className={`card w-full md:w-[277.5px]  md:h-[252px] p-5 flex flex-col items-center justify-start  text-white bg-black`} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)' }}>
                        <h1 className='text-[19px] font-[600] mb-5 text-center'>{card.title}</h1>
                        <p className='text-[15px] font-[400] leading-[28px] text-center'>{card.desc}</p>
                    </div>
                ))}
            </div>
            <div className="buttondiv">
                <button className='w-[141.5px] h-[39px] bg-[#41b349] text-[15px] font-[700] text-white'>Advantages</button>
            </div>
            <div className='w-full  flex flex-col md:flex-row items-center justify-center gap-5 md:gap-2 md:justify-between px-5 md:px-20' >
                {cards2.map((card, idx) => (
                    <div key={idx} className={`card w-full md:w-[374px] h md:h-[168.5px] p-5 flex flex-col items-center justify-start  `} style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)' }}>
                        <h1 className='text-[19px] font-[600] mb-5 text-center'>{card.title}</h1>
                        <p className='text-[15px] font-[400] leading-[28px] text-center'>{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LaravelCards
