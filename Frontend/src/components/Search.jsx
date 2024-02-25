import React, { useEffect, useState } from 'react';
import BASE_URL from '../config';
import axios from 'axios';
import Loader from './Loader';
import {useSelector} from 'react-redux'
import {formatDistanceToNow} from 'date-fns';
import { Link } from 'react-router-dom';
import List from './List';

function Search({setMsg}) {

  const [loader,setLoader] = useState(true)
  const [users,setUsers] = useState([])

const [curr_content,setCurr_content] = useState("")

  const content = useSelector(state => state.content)

  useEffect(()=>{
    setCurr_content("")
   axios.get(`${BASE_URL}/get-users`)
   .then((res)=>{
    if(res.status==200){
      setUsers(res.data)
      setLoader(false)
    }
   })
   .catch((err)=>console.log(err.message))
  },[])

  return (
    <div className='h-5/6 -mt-6 w-full flex flex-col text-white font-serif overflow-y-scroll'>
      <p className='m-4'>{users && users.length} Verified Users</p>
      { loader && <Loader /> }
      {
        curr_content ?
        <List content={curr_content} back={()=>setCurr_content("")} /> :

        users && users.map((user,index)=>{
          const userName = user.username.split('@')[0]
           const userContent = content.filter((list,index)=>list.creater==userName)
          return(
            <div key={index} className='w-full p-4 px-8  flex justify-between hover:shadow-lg shadow-md shadow-gray-700'>
              <div>
             <h1 onClick={()=>{userContent.length !== 0 ? setCurr_content(userContent) : setMsg("Selected user doesn't have any posts")}} className=' font-arial  text-lime-400 text-xl hover:underline cursor-pointer w-fit'>{userName}</h1>
              <p className='md:text-sm text-gray-400  xs:text-xs font-itim mt-2'>Account created : {formatDistanceToNow(new Date(user.updatedAt),{addSuffix:true})}</p>
              </div>
             <div className='flex flex-col items-center'>
             <h2>Posts</h2>
             <h1 className='text-2xl'> {userContent.length}</h1>
             </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Search
