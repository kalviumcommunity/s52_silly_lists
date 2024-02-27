import React, { useState,useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Loader from "./components/Loader";
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { addContent } from "./Redux/action";
import { Routes,Route,Link,useLocation, json } from "react-router-dom";
import ListInfo from "./components/ListInfo";
import BASE_URL from "./config";
import Update_Post from "./components/Update_Post";
import Search from "./components/Search";
import Signup_Login from "./components/Signup_Login";
import Alert from "./components/Alert";
import { setUserName } from "./Redux/action";


function App() {

  const dispatch = useDispatch()
  const location = useLocation()

  const [loader,setLoader]=useState(true)
  const [msg,setMsg]=useState(false)
  const [greeting,setGreeting]=useState(false)
  
  const user = useSelector((state)=>state.user)
  // console.log(user.profile)

  useEffect(()=>{
      axios.get(`${BASE_URL}/get-data`)
      .then((res)=>{dispatch(addContent(res.data)), setLoader(false)})
      .catch((err)=>console.error(err.message))

      const userData = JSON.parse(localStorage.getItem('userData'))
      if(userData){
        dispatch(setUserName({
          isLogin:true,
          userName:userData.userName,
          profile:userData.profile,
        }))
      }

      const date=new Date;
      const hour = date.getHours();
      if(hour < 12){
        setGreeting('Good Morning')
      }else if(hour >= 12 && hour <= 18){
        setGreeting('Good Evening')
      }else{
        setGreeting("Good Night")
      }
      
  },[])

  useEffect(()=>{
      if(alert){
        setTimeout(() => {
          setMsg('')
        }, 3000);
      }
  },[msg])

  useEffect(()=>{
    if(user.userName !== ""){
      const userData = {
        userName:user.userName,
        profile:user.profile,
      }
      localStorage.setItem('userData',JSON.stringify(userData))
    }
  },[user])

  const handleLogout = () => {
    if (window.confirm('Are you sure to logout')) {
      setLoader(true);
      axios.get(`${BASE_URL}/logout`,{
        withCredentials:true
      })
        .then((res) => {
          console.log(res.data);
          localStorage.clear();
          dispatch(setUserName({
            isLogin: false,
            userName: "",
            profile: ""
          }));
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false); 
        });
    }
  };
  
  
  return (
    <div className="min-h-screen w-full flex md:flex-row xs:flex-col-reverse bg-black overflow">
      <div className=" flex md:flex-col xs:flex-row items-center text-slate-300 bg-gray-900 md:p-3 xs:p-0  xs:m-0 md:m-2 rounded-lg md:justify-start xs:justify-between xs:px-10 sticky z-30 bottom-0" >
      <Link to='/' ><i className={`fa fa-home text-4xl mt-6 cursor-pointer ${location.pathname=='/' ? 'text-green-500' : ""}`}></i></Link>
      <Link to={'/search'}><i className={`fa fa-search text-3xl mt-6 cursor-pointer ${location.pathname=='/search' && 'text-green-500'}`}></i></Link>
     <Link to='/post-update' ><i className={`fa fa-paper-plane  text-2xl mt-6 cursor-pointer ${location.pathname=='/post-update' && 'text-green-500'}`}></i>
  </Link> 
      </div>
      <div className="manual-height xs:w-full md:w-page overflow-y-scroll relative bg-gradient-to-b from-green-950 to-gray-900 xs:my-0 md:my-2 rounded-lg">
        {
          msg && <Alert msg={msg} />
        }
        <h1 className="text-white font-serif text-5xl text-center m-3 mb-20">
          listy lists
        </h1>
       {/* <Link to='/post-update'><i className='fa fa-plus-circle text-white text-3xl absolute top-4 right-4 cursor-pointer'></i></Link>  */}
        
       <Routes>
          <Route path="/" element={ loader ? <Loader /> : <List/> } />
          <Route path="/signup-login" element={<Signup_Login />} />
          <Route path="/search" element={<Search setMsg={setMsg} />} />
          <Route path="/listinfo" element={<ListInfo setMsg={setMsg} />} />
          <Route path="/post-update" element={<Update_Post setMsg={setMsg} />} />
        </Routes>
        
      </div>
      <div className="flex md:justify-around xs:h-fit md:h-remains bg-gray-900 rounded-lg lg:w-fit md:m-2 xs:m-0 flex-grow text-white">
        {
          user.isLogin ? (
            <div className="flex md:flex-col xs:flex-row items-center xs:justify-around xs:w-full md:p-0 xs:p-2 md:h-fit">
            <h1 className="font-extrabold md:text-3xl xs:text-lg md:m-4 xs:hidden md:block">{greeting}</h1>
            <div className="flex md:flex-col xs:flex-row items-center ">
           {
              user.profile ? <img className="md:h-24 md:w-24 xs:h-8 xs:w-8 rounded-full border border-white" src={user.profile} alt="profile pic" /> : (
            <div className="font-extrabold text-2xl h-14 w-14 border rounded-full flex justify-center items-center bg-orange-600">{user.userName[0]}</div>
            )}
            <h1 className="m-4 font-itim">Hello {user.userName}</h1>
            </div>
            <i className="fas fa-sign-out-alt text-2xl cursor-pointer hover:text-red-400 active:text-red-500" onClick={handleLogout}></i>
            </div>
          ) : (
            <div className="flex">
       <Link to='/signup-login' state='login' ><button className=" border-4  border-lime-600 bg-lime-600 md:font-bold md:h-10 md:w-32 rounded xs:px-4 xs:m-3">log in</button></Link> 
       <Link to='/signup-login' state='signup' > <button className="border-4 border-lime-600 md:font-bold md:h-10 md:w-32 rounded  xs:px-4 xs:m-3">Sign up</button></Link> 
       </div>
       )}
      </div>
    </div>
  );
}

export default App;
