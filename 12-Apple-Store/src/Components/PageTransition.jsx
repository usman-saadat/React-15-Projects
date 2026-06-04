import React, { useEffect, useState } from 'react'

const PageTransition = ({ activePage, children }) => {
  const [currentPage, setCurrentPage] = useState(activePage)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    // Only trigger if page actually changed
    if (currentPage !== activePage) {
      // Start transition animation
      setTransitioning(true)
      // Wait for animation to complete (500ms)
      setTimeout(() => {
        setCurrentPage(activePage) // Update to new page
        setTransitioning(false) // End transition
      }, 500)
    }
  }, [activePage, currentPage])

  return (
    <div
      className="w-full h-full overflow-hidden relative"
      style={{ backgroundImage: "url(/images/pages-bg.png)" }}
    >
      <div className={`absolute w-full h-full transition-transform duration-500 ${transitioning ? "-translate-y-full": "translate-y-0"}`}>
        {children[currentPage]}
      </div>
    </div>
  )
}

export default PageTransition