import React, { useEffect, useState } from 'react';
import {formatDistanceToNow} from 'date-fns';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';


function List() {
   
  const content = useSelector(state => state.content)
  // console.log(content)
  return (
    <div className='h-full w-full'>
      <p className='text-white m-4 font-itim'>{content.length} listy lists found...</p>
      {
        content && content.map((list,list_index)=>{
            return(
              <Link key={list_index} to='/listinfo' state={list}>
              <div  key={list_index}  className='text-2xl shadow-md hover:shadow-gray-500 cursor-pointer p-5 flex justify-between active:bg-zinc-950'>
                <div >
                <h1 className=' font-serif  text-amber-200' >{list.title}</h1>
                <p className=' font-itim text-gray-100 text-sm'> Creater: Unknown</p>
                <p className='text-lime-200 text-xs mt-2' >{list.updatedAt ? (formatDistanceToNow(new Date(list.updatedAt),{addSuffix:true})) : "just now" }</p>
                </div>
               <div className='bg-zinc-950 rounded-full h-14 w-14 flex justify-center '>
               <img className='h-10' src={`https://robohash.org/${list_index}`} alt="avatar" />
              </div> 
              </div>
              </Link>
            )
        })
      }
      <p className='text-white text-center p-4 font-itim'>Created & Designed By <a href='https://portfolio-ten-phi-23.vercel.app/' target='_blank' className='text-red-400 font-serif underline'>Santhosh</a></p>
    </div>
  )
}

export default List
