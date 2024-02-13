import React, { useState,useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Loader from "./components/Loader";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { addContent } from "./Redux/action";
import { Routes,Route,Link,useLocation } from "react-router-dom";
import ListInfo from "./components/ListInfo";
import BASE_URL from "./config";
import Update_Post from "./components/Update_Post";

function App() {
  const [loader,setLoader]=useState(true)

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(()=>{
      axios.get(`${BASE_URL}/get-data`)
      .then((res)=>{dispatch(addContent(res.data)), setLoader(false)})
      .catch((err)=>console.error(err.message))
  },[])
  

  return (
    <div className="min-h-screen w-full flex justify-between md:flex-row xs:flex-col-reverse lg:pr-4 lg:pl-4 bg-zinc-950 overflow">
      <div className=" flex flex-col items-center text-slate-300 pt-6 ">
      <Link to='/' ><i className={`fa fa-home text-4xl mt-6 cursor-pointer ${location.pathname=='/' ? 'text-green-500' : ""}`}></i></Link>
      <i className="fa fa-search text-3xl mt-6 cursor-pointer"></i>
     <Link to='/post-update' ><i className={`fa fa-paper-plane  text-2xl mt-6 cursor-pointer ${location.pathname=='/post-update' ? 'text-green-500' : ""}`}></i>
  </Link> 
      </div>
      <div className="border-x border-white h-screen xs:w-full md:w-page overflow-y-scroll relative bg-gradient-to-b from-green-950 to-zinc-900">
        <h1 className="text-white font-serif text-4xl text-center m-3 mb-20">
          listy lists
        </h1>
       <Link to='/post-update'><i className='fa fa-plus-circle text-white text-3xl absolute top-4 right-4 cursor-pointer'></i></Link> 
        
       <Routes>
          <Route path="/" element={ loader ? <Loader /> : <List/> } />
          <Route path="/listinfo" element={<ListInfo />} />
          <Route path="/post-update" element={<Update_Post />} />
        </Routes>
        
      </div>
      <div className="flex md:justify-around xs:justify-end items-center h-fit xs:w-full md:w-96 lg:mt-6 ">
        <button className="text-white border-4  border-lime-600 bg-lime-600 md:font-bold md:h-10 md:w-32 rounded xs:px-4 xs:m-3">log in</button>
        <button className="text-white border-4 border-lime-600 md:font-bold md:h-10 md:w-32 rounded  xs:px-4 xs:m-3">Sign up</button>
      </div>

    </div>
  );
}

export default App;
