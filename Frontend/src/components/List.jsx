import React, { useEffect, useState } from 'react';
import {formatDistanceToNow} from 'date-fns';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';


function List() {
   
  const content = useSelector(state => state.content)
  return (
    <div className='h-full w-full'>
      {
        content && content.map((list,list_index)=>{
            return(
              <Link key={list._id} to='/listinfo' state={list}>
              <div  key={list_index}  className='text-2xl shadow-md hover:shadow-gray-500 cursor-pointer p-5 flex justify-between hover:bg-black'>
                <div >
                <h1 className=' font-itim  text-amber-200' >{list.title}</h1>
                <p className=' font-itim text-gray-100 text-sm'> Creater: Unknown</p>
                <p className='text-lime-200 text-xs mt-2' >{formatDistanceToNow(new Date(list.updatedAt),{addSuffix:true})}</p>
                </div>
                <span className='text-white'>&#9660;</span> 
              </div>
              </Link>
            )
        })
      }
    </div>
  )
}

export default List
