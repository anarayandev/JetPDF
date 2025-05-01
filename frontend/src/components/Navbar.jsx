import React, { useState, useEffect } from 'react'
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md';

const Navbar = () => {

  const [darkMode, setDarkMode] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <>
    <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16 fixed text-green-950 dark:bg-green-950 dark:text-green-100 dark:shadow-emerald-200/30 transition-all duration-500'>

      <div className='flex justify-between'>

        <h1 className='text-2xl cursor-pointer font-bold'>Jet<span className='text-3xl text-green-500'>PDF</span></h1>

        <div className='flex items-center gap-4'>

          <h1 className='mt-1 text-2xl cursor-pointer font-bold hover:scale-125 duration-300'>Home</h1>

          <div
          onClick={toggleDarkMode}
          onMouseEnter={()=>setHovered(true)}
          onMouseLeave={()=>setHovered(false)}
          className='sm:w-6 sm:h-6 mt-1 hover:cursor-pointer transition-all cursor-pointer'
          >
            {hovered ? <MdDarkMode size={24} /> : <MdOutlineDarkMode size={24} />}
          </div>

        </div>
        
      </div>
    </div>
    </>
  )
}

export default Navbar