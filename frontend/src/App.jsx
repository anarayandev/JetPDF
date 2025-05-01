import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
    <Navbar />
    <div className='flex-1'>
      <Home />
    </div>
    <Footer />
    </div>
  )
}

export default App