import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addContent } from "../Redux/action";
import BASE_URL from "../config";
import axios from "axios";
import Loader from "./Loader";
 

function Update_Post({setMsg}) {

  const inputRef = useRef(null)
  const titleFocus = useRef(null)
  const divRef = useRef(null)

const location = useLocation()
const dispatch = useDispatch()
const navigate = useNavigate()

const data = useSelector(state => state.content)

const content = location.state || null;

  const [title,setTitle] = useState(content ? content.title : "")
  const [lists,setLists] = useState(content ? content.content : [])
  const [loader,setLoader]=useState(false)

  const user = useSelector((state)=>state.user)

useEffect(()=>{
  setTimeout(()=>divRef.current.style.right='0',0)
  titleFocus.current.focus()
},[])


const handleDelete = (delete_index) => {
  const newList = lists.filter((list,list_index)=>list_index!==delete_index)
  setLists(newList)
} 

const handleCreate = () => {
  if(inputRef && inputRef.current.value && inputRef.current.value != ""){
    const value = [...lists,inputRef.current.value]
    setLists(value)
    inputRef.current.value="";
  }
}

const handleSumbit = () => {
    if(title !== "" && lists.length !== 0){ 
      setLoader(true)
        


      if(content){

        axios.put(`${BASE_URL}/update-data/${content._id}`,{
          title:title,
          content:lists
        },{
          withCredentials:true
        })
        .then((res)=>{
          let updatedList = [...data];
          const index=data.findIndex((list)=>list._id === content._id);
          updatedList[index] = {...updatedList[index],title:title,content:lists};
          dispatch(addContent(updatedList));
          setLoader(false)
          navigate('/')
        })
        .catch((err)=>{
          console.log(err.message)
          if(err.response.status==403){
            setMsg('Session expired, Please logout and login again')
          }
          setLoader(false)
        })

      }else{
        
        axios.post(`${BASE_URL}/create-data`,{
          title:title,
          content:lists,
          creater:user.userName,
        },{withCredentials:true})
        .then((res)=>{
          const newContent = [...data,res.data]
          dispatch(addContent(newContent))
          setLoader(false);
        window.history.back()
        })
        .catch((err)=>{
          console.log(err.message)
          if(err.response.status==403){
            setMsg('Session expired, Please logout and login again')
          }
          setLoader(false)
        })
      }
    }else{
      alert("Please fill the required fields")
    }
}

const handleClose = () => {
  divRef.current.style.right='-100vh'
  setTimeout(()=>window.history.back(),200)
}

  return (
    <div className="w-full h-full absolute top-0 flex justify-center items-center manual-blur">
      <div  ref={divRef} className="h-5/6 md:w-4/6 xs:w-5/6 rounded-lg bg-neutral-900 text-white relative flex flex-col justify-center items-center right-3/4 transition-all duration-200 ease-in-out">
        
          <div className="absolute top-1 right-2 text-4xl cursor-pointer" onClick={handleClose}>
            &times;
          </div>
        <input type="text" ref={titleFocus} value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-transparent border border-white rounded-lg h-12 w-3/4 font-itim  text-amber-200 text-2xl m-5 pl-2" placeholder="Enter the title" />
        <div className='rounded h-60 w-60 manual-shadow flex flex-col items-center overflow-y-scroll pt-2'>
                {
                  lists && lists.length > 0 ? lists.map((list,index)=>{
                    return(
                      <div key={index} className="w-5/6 px-4 rounded-lg flex justify-between items-center m-1 bg-zinc-950 ">
                        <h1 className=" w-5/6 overflow-hidden text-white">{list}</h1>
                        <span  onClick={()=>handleDelete(index)} className="cursor-pointer text-2xl">&times;</span>
                      </div>
                    )
                  }) : (
                    <h1 className="font-itim text-white">Oops Empty!</h1>
                  )
                }
        </div>
        <div className="m-4 border border-white rounded flex w-4/6">
          <input ref={inputRef} className="bg-transparent pl-2 md:w-4/6 xs:w-4/6" type="text" onKeyUp={(e)=>e.key=='Enter' && handleCreate()} /> 
          <button className="bg-cyan-600 text-black h-6 flex-grow" onClick={handleCreate}>ADD LIST</button>
        </div>

        <button className="text-white bg-lime-600 rounded h-8 w-28 hover:bg-lime-700 absolute right-4 bottom-4" onClick={()=>user.isLogin ? handleSumbit() : setMsg('Please login to get the whole access')}>{content ? "UPDATE" : "POST"}</button>
      </div>
      {
        loader && <Loader />
      }
    </div>
  );
}

export default Update_Post;
