import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  {/* ===== States ===== */ }
  const [rgb, setRgb] = useState({
    r: 255, 
    g: 103,
    b: 87
  })

  const [hex, setHex] = useState("#ff6757")

  {/* ===== Update Functions ===== */ }
  const handleRgbChange = (e) => {
    const {name, value} = e.target
    setRgb({
      ...rgb, 
      [name]:Number(value)
    })
  }

  const handleHexChange = (e) => {
    setHex(e.target.value)
  }

  {/* ===== Convertering RGB to Hexadecimal  ===== */ }
  const rgbToHex = (r, g, b) => {
    const clamp = (value) =>  Math.max(0, Math.min(255, value))
    const red = clamp(r).toString(16).padStart(2, 0) // so if 'r' = 255 then: 255.toString(16)= 'ff'
    const green = clamp(g).toString(16).padStart(2, 0)
    const blue = clamp(b).toString(16).padStart(2, 0)
    
    return `#${red}${green}${blue}` // returns hexedecimal color -> '#ff0080'
  }

  {/* ===== Convertering Hexadecimal to RGB  ===== */ }
  const hexToRgb = (hex) => {
    hex = hex.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16) // if hex="#ff0080", hex.substring(0, 2) -> Take characters from index 0 up to 2 (not including 2) .i.e. "ff". So, parseInt("ff", 16) = 255. So, r = 255
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return {r, g, b} // returns an 'object' -> { r:255, g:0, b:128}
  }

  {/* ===== Keeping State Synchronized with useEffect  ===== */ }

  {/* Create useEffect to update hex when RGB changes: */ }
  useEffect(() => {
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b))
  }, [rgb])

  {/* Create useEffect to update RGB when hex changes: */ }
  useEffect(() => {
    // first validate hex value using regular expression
    if(/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      setRgb(hexToRgb(hex))
    }
  }, [hex])


  return (
    <div className='app'>
      <div className="converter">
        <h1>Color Converter</h1>

        {/* ===== RGB SECTION ===== */}
        <div className="rgb-section">
          <h2>RGB</h2>
          <div className="input-groups">
            <div className="input-group">
              <label>R:</label>
              <input type="number" name='r' min='0' max='255' value={rgb.r} onChange={handleRgbChange} />
            </div>
            <div className="input-group">
              <label>G:</label>
              <input type="number" name='g' min='0' max='255' value={rgb.g} onChange={handleRgbChange}/>
            </div>
            <div className="input-group">
              <label>B:</label>
              <input type="number" name='b' min='0' max='255' value={rgb.b} onChange={handleRgbChange}/>
            </div>
          </div>
        </div>

        {/* ===== HEX SECTION ===== */}
        <div className="hex-section">
          <h2>HEX</h2>
          <input type="text" maxLength='7' value={hex} onChange={handleHexChange}/>
        </div>
      </div>
      
      {/* ===== Color Preview ===== */}
      <div className="color-preview" style={{backgroundColor: hex}}></div>
    </div>
  )
}

export default App