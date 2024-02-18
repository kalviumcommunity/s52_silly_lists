import React, { useEffect, useState } from 'react';
import {formatDistanceToNow} from 'date-fns';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { addContent } from "../Redux/action";

function List(props) {

  const content = props.content || useSelector(state => state.content)
  const dispatch= useDispatch()

  const [sort,setSort] = useState(true)

  const handleSort = () => {
     const reverseList = [...content].reverse()
    dispatch(addContent(reverseList))
    setSort(!sort)
  }
  
  return (
    <div className='h-full w-full'>
      <div className='w-full flex justify-between p-4 text-white'>
        {
          props.content ? <p><span className='text-red-500 underline'>{props.content[0].creater}</span>  have {props.content.length} posts</p> :
          <p className='font-itim'>{content.length} listy lists found...</p>
        }
        {
          props.content ? <i onClick={()=>props.back()} className='fa fa-angle-double-left  hover:text-gray-400 text-lg cursor-pointer'> Back</i> :  <i className={`${sort ? 'fas fa-sort-numeric-up' : 'fas fa-sort-numeric-down-alt'} hover:text-gray-300 text-xl`} onClick={handleSort}></i>  
        }
         
      </div>
     
      {
        content && content.map((list,list_index)=>{
            return(
              <Link key={list_index} to='/listinfo' state={list}>
              <div  key={list_index}  className='text-2xl shadow-md hover:shadow-gray-500 cursor-pointer p-5 flex justify-between active:bg-zinc-950'>
                <div >
                <h1 className=' font-serif  text-amber-200' >{list.title}</h1>
                <p className=' font-itim text-gray-100 text-sm'> Creater: {list.creater ? list.creater : "unknown"}</p>
                <p className='text-lime-200 text-xs mt-2' >{list.updatedAt ? (formatDistanceToNow(new Date(list.updatedAt),{addSuffix:true})) : "just now" }</p>
                </div>
               <div className=' rounded-full h-14 w-14 items-center flex justify-center '>
               {/* <img className='h-12' src={`https://robohash.org/${list_index}`} alt="avatar" /> */}
               <i className='fa fa-user-circle text-gray-300 text-3xl'></i>
              </div> 
              </div>
              </Link>
            )
        })
      }
     
    </div>
  )
}

export default List
