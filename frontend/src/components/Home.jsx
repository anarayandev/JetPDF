import React, { useState } from 'react'
import axios from 'axios'
import { FaFileWord } from 'react-icons/fa6'

const Home = () => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [convert, setConvert] = useState('')
  const [downloadError, setDownloadError] = useState('')

  const handlerFileChange = (e) => {
    // console.log(e.target.files[0])
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      setConvert('Please select a file..!')
      return
    }
    const formData = new FormData()
    formData.append('wordFile', selectedFile)
    try {

      const response = await axios.post('http://localhost:4009/convertFile', formData, {
        responseType: 'blob'
      })
      // console.log(response.data)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      // console.log(url)
      const link = document.createElement('a')
      // console.log(link)
      link.href = url
      // console.log(link)
      link.setAttribute('download', selectedFile.name.replace(/\.[^/.]+$/,"")+".pdf")
      // console.log(link)
      document.body.appendChild(link)
      // console.log(link)
      link.click()
      link.parentNode.removeChild(link)
      setSelectedFile(null)
      setDownloadError('')
      setConvert('File Converted Successfully')
      
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status == 400) {
        setDownloadError('Error occurred', error.response.data.message)
      } else {
        setConvert('')
      }
    }
  }

  return (
    <>
    <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 max-h-[85vh] text-green-950 dark:bg-green-950/90 dark:text-green-100 transition-all duration-500 ease'>
      <div className='flex h-screen items-center justify-center pb-7'>

        <div className='border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-green-400 rounded-lg shadow-lg'>
          <h1 className='text-3xl font-bold text-center mb-2'>Convert Word to PDF with just <span className='text-green-500'>one click</span></h1>
          <p className='text-sm text-center mb-4'>Convert your Word Documents to PDF format instantly, without risking your personal data.</p>

        <div className='flex flex-col items-center space-y-5'>
          <input onChange={handlerFileChange} className='hidden' type="file" accept='.doc, .docx' id='FileInput' />
          <label htmlFor="FileInput" className='w-full flex items-center justify-center gap-4 px-4 py-5 bg-green-100 text-gree-950 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-green-700 hover:text-white dark:text-green-950 dark:hover:text-white transition-all duration-500 ease'>
            <FaFileWord className='w-6 h-6 sm:w-8 sm:h-8' />
            <span className='text-xl tracking-wider mr-3 font-semibold'>{selectedFile ? selectedFile.name : 'CHOOSE FILE'}</span>
          </label>

          <button onClick={handleSubmit} disabled={!selectedFile} className='text-white bg-green-600 disabled:bg-gray-400 disabled:pointer-events-none hover:bg-green-700 duration-300 font-bold px-4 py-2 rounded-lg'>Convert to PDF</button>
          {convert && ( <div className='text-green-500 text-center font-semibold tracking-wider dark:text-green-400'>{convert}</div> )}
          {downloadError && ( <div className='text-red-500 text-center dark:text-red-400 dark:text-center'>{downloadError}</div> )}
        </div>
      </div>

      </div>
    </div>
    </>
  )
}

export default Home
