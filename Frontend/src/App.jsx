import React, { useState,useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Loader from "./components/Loader";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { addContent } from "./Redux/action";
import { Routes,Route } from "react-router-dom";
import ListInfo from "./components/ListInfo";
import BASE_URL from "./config";

function App() {
  const [loader,setLoader]=useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
      axios.get(`${BASE_URL}/get-data`)
      .then((res)=>{dispatch(addContent(res.data)), setLoader(false)})
      .catch((err)=>console.error(err.message))
  },[])
  

  return (
    <div className="min-h-screen w-full flex justify-between md:flex-row xs:flex-col-reverse bg-black lg:pr-4 lg:pl-20">
      <div className="border-x border-white h-screen xs:w-full md:w-page md:-mr-10 bg-zinc-950 overflow-y-scroll relative ">
        <h1 className="text-white font-serif text-4xl text-center m-3 mb-20">
          listy lists
        </h1>
        
       <Routes>
          <Route path="/" element={ loader ? <Loader /> : <List/> } />
          <Route path="/listinfo" element={<ListInfo />} />
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
