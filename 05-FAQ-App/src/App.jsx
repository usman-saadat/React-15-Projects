import React, { useEffect, useState } from 'react'
import FAQList from './Components/FAQList'

const App = () => {
  {/* State */ }
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode')
    return savedTheme ? JSON.parse(savedTheme) : false
  })

  {/* useEffect */ }
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Save to local storage whenever darkMode changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])


  {/* Function*/ }
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300' >
      <div className='container mx-auto p-12'>
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text'>
            FAQ Center
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Find answers to the most common questions about Tailwind, CSS and web development.
          </p>
        </header>
      </div>
      <FAQList darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    </div>
  )
}

export default App