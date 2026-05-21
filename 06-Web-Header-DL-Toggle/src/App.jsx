import React, { useEffect, useState } from 'react'
import Hero from './Components/Hero'

const App = () => {
  {/* States */}
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      return savedTheme === 'dark'
    } else {
      return window.matchMedia('(prefers-color-scheme)').matches
    } 
  })

  {/* useEffect for Dark Mode */}
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  {/* Toggle function for Dark Mode */}
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  


  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 relative transition-colors duration-300 isolate">
      {/* Background Container */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        {/* Dotted Pattern */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>
      {/* Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-3 lg:top-4 right-3 lg:right-4 w-9 h-9 lg:w-10 lg:h-10 flex justify-center items-center rounded-full bg-amber-500 text-neutral-950 shadow-lg hover:bg-amber-600 transition-colors z-10"
      >
        {/* Moon & Sun Icons toggle */}
        <i
          className={`bx ${darkMode ? "bx-sun" : "bx-moon"} text-lg lg:text-xl`}
        ></i>
      </button>
      <Hero />
    </div>
  );
}

export default App
