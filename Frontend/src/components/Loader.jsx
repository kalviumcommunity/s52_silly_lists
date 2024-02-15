import React from 'react';
import loader_gif from '../assets/loader.gif';
import '../App.css'

function Loader() {
  return (
    <div className='h-screen w-full flex justify-center items-center absolute top-20 manual-blur z-10'>
      <div className='flex  flex-col justify-center items-center'>
        <img className='h-28' src={loader_gif} alt="" />
        <p className='text-white font-itim'>Loading...</p>
      </div>
    </div>
  )
}

export default Loader
