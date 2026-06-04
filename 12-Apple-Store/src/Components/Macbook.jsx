import React, { useState } from 'react'
import { macbookModels } from '../data/index'

const Macbook = () => {
  const [selectedChip, setSelectedChip] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)

  const currentMacbook = macbookModels[selectedChip]
  const currentColor = currentMacbook.colors[selectedColor]

  const handleSelectedChip = (index) => {
    setSelectedChip(index)
    setSelectedColor(0) // Reset color when switching models
  }
  return (
      <div className="flex flex-col items-center justify-around bg-white p-8 h-full">
          {/* Heading */}
          <h1 className="2xl:text-4xl xl:text-3xl md:text-2xl font-semibold text-gray-800 mb-8">Choose your new Macbook Air.</h1>
          {/* Buttons (M2 & M3) */}
          <div className='flex'>
            {macbookModels.map((mb, index) => (
              <button
                key={index}
                onClick={() => handleSelectedChip(index)}
                className={`2xl:w-36 md:w-26 w-28 2xl:h-18 md:h-12 h-12 flex flex-col justify-evenly items-center border 
                ${index === 0 ? "rounded-l-xl" : "rounded-r-xl"} 
                ${index === selectedChip ? "border-2 border-blue-400" : "border-gray-800"}`}>
                <span className="2xl:text-lg xl:text-sm text-xs font-bold text-gray-800">
                  With {mb.chip} chip
                </span>
                <span className="2xl:text-base xl:text-sm text-xs text-gray-600">{mb.price}</span>
                  </button>
            ))}
          </div>
          {/* Current */}
          <div className="flex flex-col 2xl:py-4 md:items-start items-center">
            <div className="w-80 h-64 2xl:mb-0 -mb-8">
              {/* Current Dynamic Image */}
              <img 
              src={currentColor.img} 
              alt={`Macbook Air with ${currentMacbook.chip}`}
              className="2xl:w-72 xl:w-52 w-48 h-full 2xl:mt-0 sm:-mt-6 object-contain m-auto"/>
              </div>
              {/* Current Name */}
              <span className="2xl:text-lg xl:text-sm font-medium text-gray-800 mb-2 text-center md:text-left">
                {currentColor.label}
              </span>
              {/* Current Color Selection Button */}
              <div className="flex space-x-2 mb-4 md:text-left justify-center md:justify-start">
                {currentMacbook.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    style={{ backgroundColor: color.bg }}
                    className={`2xl:w-6 sm:w-5 w-4 2xl:h-6 sm:h-5 h-4 rounded-full border 
                ${selectedColor === index ? "border-2 border-blue-400" : "border-transparent"}
                hover:border-blue-500 transition-all`}
                  ></button>
                ))}
              </div>
              {/* Chip icon */}
              <img 
                src={currentMacbook.icon} 
                alt={`Apple ${currentMacbook.chip} Icon`} 
                className='w-12 h-12 2xl:mb-4 xl:mb-2 object-contain'
              />
              {/* Dynamic Specs Rendering */}
              <div className="2xl:mb-4 xl:mb-2 text-center md:text-left">
                {currentMacbook.specs.map((spec, index) => (
                  <p key={index} className='2xl:text-lg xl:text-base font-semibold text-gray-800 mb-0.5'>
                    {spec}
                  </p>
                ))}
              </div>
              {/* Buy Button */}
              <button 
              type="button" 
              className="w-min text-sm py-1 px-3 bg-blue-400 text-white rounded-full mt-4 md:mt-0">
                Buy
              </button>
            
          </div>
      </div>
  )
}

export default Macbook