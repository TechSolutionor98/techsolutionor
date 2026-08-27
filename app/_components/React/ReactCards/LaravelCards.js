import React from 'react'

const ReactCards = () => {
    const cards = [
        { title: "Virtual DOM", desc: "React uses a virtual DOM to enhance performance by minimizing direct manipulation of the real DOM." },
        { title: "JSX", desc: "JSX, a syntax extension for JavaScript, allows you to write HTML directly within React, making the code more readable and easier to debug." },
        { title: "Unidirectional Data Flow", desc: "Data flows in a single direction, making it easier to understand and debug applications." },
        { title: "React Hooks", desc: "Hooks let you use state and other React features without writing a class, simplifying your code and making it more functional." },
    ]
    const cards2 = [
        {title: "Performance", desc: "By leveraging the virtual DOM, React minimizes direct manipulation of the real DOM, resulting in faster and more efficient updates."},
        {title: "Flexibility", desc: "React’s component-based architecture makes it versatile and suitable for a wide range of applications, from simple web pages to complex, large-scale web applications."},
        {title: "Strong Community and Ecosystem", desc: "React has a vast and active community that contributes to a rich ecosystem of tools, libraries, and resources."},
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
            <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-5 md:gap-2 md:justify-between px-5 md:px-20">

                {cards2.map((card, idx) => (
                   <div
  key={idx}
  className="card w-full md:w-[374px] p-5 flex flex-col items-center justify-start"
  style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)' }}
>

                        <h1 className='text-[19px] font-[600] mb-5 text-center'>{card.title}</h1>
                        <p className='text-[15px] font-[400] leading-[28px] text-center'>{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReactCards
