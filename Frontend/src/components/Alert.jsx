import React from 'react'
import { useSelector } from 'react-redux'

function Alert() {

  const user = useSelector((state)=>state.user)


  return (
    <div className='h-full w-full absolute z-20 flex justify-center items-center'>
      <div className='w-5/6 h-8 bg-red-600 rounded-sm animate-pulse  flex justify-center items-center text-white font-itim'>
            {user.isLogin ? 'Session expired, Please logout and login again' : 'Please login to get the whole access'}
      </div>
    </div>
  )
}

export default Alert
