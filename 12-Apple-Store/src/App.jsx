import React, { useState } from 'react'
import { useEffect } from 'react'
import Controls from './Components/Controls'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import IPhone from './Components/IPhone'
import Macbook from './Components/Macbook'
import Watch from './Components/Watch'
import Imac from './Components/Imac'
import PageTransition from './Components/PageTransition'

const App = () => {
  const [frameZoom, setFrameZoom] = useState(false)
  const [activePage, setActivePage] = useState(0)
  const [isLgScreen, setIsLgScreen] = useState(window.innerWidth > 1024)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 1024);
      if (window.innerWidth < 1024) {
        setFrameZoom(true);  // Force zoomed in on tablets
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavClick = (pageIndex) => {
    setActivePage(pageIndex)
  }

  const toggleZoom = () => {
    if (isLgScreen) {
      setFrameZoom(!frameZoom);
    }
  }

  const resetPage = () => {
    setActivePage(0) // 0 = Home Page
  }

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="w-full h-screen grid place-items-center">
      {/* Frame Container */}
      <div className={`${frameZoom && "min-w-[97vw] min-h-[97vh]"} w-[70vw] h-[85vh] min-w-[70vw] min-h-[85vh] max-w-[90vw] max-h-[90vh] border border-gray-300 rounded-2xl resize overflow-auto relative transition-all duration-100 flex`}>
        <Navbar activePage={activePage} handleNavClick={handleNavClick} isNavbarOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
        <Controls toggleZoom={toggleZoom} frameZoom={frameZoom} resetPage={resetPage} activePage={activePage} />
        <div className="flex-grow">
          <PageTransition activePage={activePage}>
            <Home onNavigate={handleNavClick} />
            <IPhone />
            <Macbook />
            <Watch />
            <Imac />
          </PageTransition>
        </div>
      </div>
    </div>
  )
}

export default App