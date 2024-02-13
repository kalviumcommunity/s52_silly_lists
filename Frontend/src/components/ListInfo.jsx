import React,{useState, useRef, useEffect} from 'react';
import { useLocation,Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addContent } from '../Redux/action';
import BASE_URL from '../config';
import Loader from './Loader';

function ListInfo() {

  const divRef = useRef(null)

  const location = useLocation()
  const curr_content = location.state;
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const [loader,setLoader]=useState(false)

  const content = useSelector(state => state.content)

  useEffect(()=>{
    setTimeout(()=>divRef.current.style.bottom='0',0)
  },[])

  const handleClose = () => {
    divRef.current.style.bottom='-100vh'
    setTimeout(()=>navigate('/'),200)
  }


  const handleDelete = () => {
      if(window.confirm('Are you sure to delete this item (irreversible)')){
        setLoader(true)
        let newArray = content.filter((list,index)=>list._id !== curr_content._id)   
        dispatch(addContent(newArray))

        axios.delete(`${BASE_URL}/delete-data/${curr_content._id}`)
        .then((res)=>{setLoader(false),navigate('/')})
        .catch((err)=>console.log(err.message))
      }
  }
 
  return (
    <div className='w-full h-full absolute top-0 flex justify-center items-center manual-blur'>
      {
        loader && <Loader />
      }
      <div ref={divRef} className='h-5/6 w-4/6 rounded-lg bg-neutral-900 text-white relative flex flex-col justify-center items-center bottom-3/4 transition-all duration-200 ease-in'>
      <div onClick={handleClose} className='absolute top-1 right-2 text-4xl cursor-pointer'>&times;</div>
        <div >
        <h1 className='font-itim  text-amber-200 text-2xl m-5'>{curr_content.title }</h1>
        </div>
          <div className='rounded h-72 w-4/6 manual-shadow flex flex-col overflow-y-scroll'>
              {
                curr_content.content && curr_content.content.map((list,index)=>{
                  return(
                    <div key={index} className='font-itim text-lg shadow-xl w-full p-2 m-2'>
                      <h2>{list}</h2>
                    </div>
                  )
                })
              }
          </div>
          <div className='w-4/6 flex justify-around items-center m-5 -mb-10'>
          <Link to='/post-update' state={curr_content}><i className="fa fa-edit  text-2xl cursor-pointer text-lime-400 hover:text-lime-600" ></i></Link>
          <i onClick={handleDelete} className="fa fa-trash-o text-2xl cursor-pointer text-red-500 hover:text-red-700" ></i>
          </div>
      </div>
    </div>
  )
}

export default ListInfo
