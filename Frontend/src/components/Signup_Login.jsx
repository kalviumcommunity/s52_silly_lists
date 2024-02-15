import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {useForm} from 'react-hook-form'
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import Loader from './Loader';
import { setUserName } from "../Redux/action";
import {useDispatch,useSelector} from 'react-redux'
import {auth,provider} from '../google/config'
import { signInWithPopup } from "firebase/auth";
import BASE_URL from "../config";


function Signup_Login() {

  const location = useLocation() 
  const dispatch = useDispatch() 
  


  const [methodEmail,setMethodEmail] = useState(true)
  const [signUpPage,setSignUpPage] = useState(location.state ? location.state=='signup' ? true : false : true);
  const [usernameError,setUSerNameError] = useState('')
  const [passwordError,setPasswordError] = useState('')
  const [loader,setLoader] = useState(false)

  const [userProfile,setUserProfile] = useState('')

const divRef = useRef(null)
const navigate = useNavigate()

const {register, handleSubmit, formState: { errors, isValid }, watch,} = useForm();

useEffect(()=>{
  setTimeout(()=>divRef.current.style.left='0',0)
},[])

const handleClose = () => {
  divRef.current.style.left='-100vh'
  setTimeout(()=>navigate('/'),200)
}

const handlePage = () => {
  setSignUpPage(!signUpPage)
  setUSerNameError('')
  setPasswordError('')
}

const onSubmit = (data) => {
  const {username,password} = data;
  setLoader(true)
  if(signUpPage){
    axios.post(`${BASE_URL}/signup`,{
      username:username,
      password:password,
    })
    .then((res)=>{
      if(res.data == 'username already exists'){
        setUSerNameError('oops, username already taken!')
      }else if(res.status === 200){
        localStorage.setItem('token',res.data)
        setUSerNameError('')
        const name = username.split('@')[0]
        dispatch(setUserName({
          isLogin:true,
          userName:name,
          profile:""
        }))
        navigate('/')
      }
    })
    .catch((err)=>console.log(err.message))
    .finally(()=> setLoader(false))
  }else{
    axios.post(`${BASE_URL}/login`,{
      username:username,
      password:password,
    })
    .then((res)=>{
      if(res.data == "cannot find your account"){
        setUSerNameError(res.data)
      }else if(res.data =='wrong password'){
        setPasswordError(res.data)
      }else if(res.data =='login successfull'){
        localStorage.setItem('token',res.data)
        const name = username.split('@')[0]
        dispatch(setUserName({
          isLogin:true,
          userName:name,
          profile:""
        }))
        navigate('/')
      }
    })
    .catch((err)=>console.log(err.message))
    .finally(()=> setLoader(false))
  }
}

const handleGoogleLogin = () => {
  signInWithPopup(auth,provider)
  .then((res)=>{
    console.log(res.user)
    dispatch(setUserName({
      isLogin:true,
      userName:res.user.displayName,
      profile:res.user.photoURL,
    }))
    setUserProfile(res.user.photoURL)

    axios.post(`${BASE_URL}/google-login`)
    .then((res)=>{
      if(res.status = 200){
        localStorage.setItem('token',res.data)
      }
    })
    .catch((err)=>console.log(err.message))
    navigate('/')
  })
  .catch((err)=>console.log(err))
}

  return (
    <div className="h-full w-full flex justify-center items-center absolute top-0 manual-blur">
      {
        loader && <Loader />
      }
      <div ref={divRef}  className="h-5/6 md:w-4/6 xs:w-full rounded-lg bg-neutral-900 text-white relative flex flex-col justify-center items-center font-serif py-2 left-3/4 transition-all duration-200 ease-in-out">
      <div onClick={handleClose} className='absolute top-1 right-2 text-4xl cursor-pointer'>&times;</div>
        <form className="w-4/6" onSubmit={handleSubmit(onSubmit)}> 
        <div>
          <label htmlFor="email" className="block">{methodEmail ? 'Email address' : 'Phone Number'}</label>
          <input type={methodEmail ? 'email' : 'number'} id="email" className="bg-transparent border border-gray-400 h-10 w-full rounded-sm font-sans pl-2" placeholder={methodEmail ? 'example@domain.com' : 'phone no.'} {...register('username',{required:"mail id or phone no. required"})} />
          <p className="text-red-500 font-itim text-md">{errors.username?.message}</p>
        <p  className="text-red-500 font-itim text-md">{usernameError && usernameError}</p>
        </div>
       <h1 className="my-2 text-green-500 underline cursor-pointer font-semibold" onClick={()=>setMethodEmail(!methodEmail)}>{methodEmail ? 'Use phone number instead.' : 'Use mail id instead.'}</h1>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input type="text" id="password" className="bg-transparent border border-gray-400 h-10 w-full rounded-sm font-thin pl-2" placeholder="example123#" {...register('password',{required:'password is required',minLength:{
            value:5,
            message:'password should be greater than 5 characters'
          },maxLength:{
            value:10,
            message:'password should be lesser than 10 characters'
          }})}/>
           <p className="text-red-500 font-itim text-md">{errors.password?.message}</p>
          { passwordError && <p className="text-red-500 font-itim text-md">{passwordError}</p> }
        </div>
        {
          signUpPage && (
        <div className="mt-3">
          <label htmlFor="repeat-password" className="block">Repeat Password</label>
          <input type="text" id="repeat-password" className="bg-transparent border border-gray-400 h-10 w-full rounded-sm font-thin pl-2" placeholder="example123#" {...register("repeatPassword", {
            required: "Please repeat the password",
            validate: (value) =>
              value === watch('password') || "Password does not match",
          })} />
           <p className="text-red-500 font-itim text-md">{errors.repeatPassword?.message}</p>
        </div>
        )}
        <button type="submit" className="bg-green-500 text-black font-sans font-bold w-full h-10 mt-3 mb-1 rounded-3xl">{signUpPage ? 'SIGN UP' : 'LOG IN'}</button>
        </form>
        <div className="w-4/6 flex justify-center items-center text-gray-300">
        <hr className="w-2/6 border-gray-400" />
        <h1 className="m-2">or</h1>
        <hr className="w-2/6 border-gray-400" />
        </div>
        
        <div className="lg:w-3/6 xs:w-4/6 h-10 border border-gray-400 flex items-center rounded-3xl cursor-pointer" onClick={handleGoogleLogin}>
        <img width="32" height="32" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo" className="md:mx-5 xs:mx-2"/>
        <h1 className="font-sans md:font-bold xs:font:semibold">Login with Google</h1>
        </div>

        <p className="text-gray-400 font-semibold m-2 absolute bottom-1">{signUpPage ? 'Already have an account?' : "Don't have an account?"} <span className="text-gray-100 underline cursor-pointer" onClick={handlePage}> {signUpPage ? ' Log in here' : 'Sign up here'}</span></p>
      </div>
    </div>
  );
}

export default Signup_Login;
