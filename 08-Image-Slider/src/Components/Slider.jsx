import React, { useState } from 'react'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import { descriptions, images } from '../data'

const getRandomNumber = () => {
    return Math.floor(Math.random() * 41) -20
}

const Slider = () => {
    const [index, setIndex] = useState(0)

    return (
      // Container
        <div className='relative'>
            {/* Slider */}
            <div className="flex gap-x-20 lg:items-start items-center lg:flex-row flex-col">
                {/* Images */}
                <div className='sm:w-[400px] sm:h-[400px] w-[300px] h-[300px] relative'>
                    {images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            style={{ transform: `rotate(${i === index ? 0 : getRandomNumber()}deg)` }}
                            className={`w-full h-full absolute object-cover rounded-3xl transition-all duration-300 ${i === index ? "activeImage" : "inactiveImage"}`}
                        />
                ))}
                </div>
                {/* Descriptions */}
                <div className='relative sm:w-[400px] w-[320px] mt-22 lg:mt-5'>
                    {descriptions.map((desc, i) => (
                        <p
                            key={i}
                            className={`text-center sm:text-xl text-gray-600 absolute transition-all duration-300 ${i === index ? 'activeDesc delay-200' : 'inactiveDesc'}`}
                            
                        >
                            {desc}
                        </p>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 lg:-bottom-20 left-1/2 -translate-x-1/2 flex gap-x-5">
                <button
                    onClick={() => setIndex((prev) => prev === 0 ? images.length - 1 : prev - 1)}
                    className="bg-gray-100 p-1.5 cursor-pointer rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={18} />
                </button>
                <button
                    onClick={() => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="bg-gray-100 p-1.5 cursor-pointer rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
  )
}

export default Slider