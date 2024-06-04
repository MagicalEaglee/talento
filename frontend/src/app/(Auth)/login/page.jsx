"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { auth,db } from '../../../../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {toast} from "react-hot-toast"

function login() {
  const router=useRouter()
  const[lvalues,setLvalues]=useState({email:"",password:""})
  const[errors,seterror]=useState({})
  const handleval=(e)=>{
    const{name,value}=e.target
    setLvalues({...lvalues,[name]:value})
  }
  const validation=()=>{
    let err={}
    if(!lvalues.email) err.email="Enter Username"
    if(!lvalues.password) err.password="Enter Password"

    return err
  }
  const handlelog=async ()=>{
    
    const errorResults=validation();
    if(Object.keys(errorResults).length>0){
      seterror(errorResults)
    }else{
      try{
        await signInWithEmailAndPassword(auth,lvalues.email,lvalues.password);
        toast.success("login Successfull!")
        setLvalues({email:"",password:""})
        router.replace("/")
      }
      catch(error){
        console.log(error.message)
        toast.error(error.message)
      }
    }
    
  }
  return (
    <>
      <div className='bg-white border-2 border-[var(--imp-color)] w-1/3 mt-24 mx-auto text-center p-10'>
        <h1 className='text-gradient text-[3rem] font-extrabold my-8'>Login</h1>
        <form action="" onSubmit={(e)=>e.preventDefault()} className='flex flex-col space-y-5'>
          <input type="email" placeholder='Email' value={lvalues.email} onChange={handleval} name='email' className={`border-2 focus:outline-none h-12 p-5 ${errors.email ? 'border-red-600' : ''}`} />
          <input type="password" placeholder='Password' value={lvalues.password} onChange={handleval} name='password'  className={`border-2 focus:outline-none h-12 p-5 ${errors.password ? 'border-red-600' : ''}`}/>
          <button type="submit" onClick={handlelog} className=' bg-[var(--imp-color)] py-2 text-white bg-[var(--imp-color)] py-2  text-xl'>Login</button>
          {errors.message && <span>Invalid Email and Password</span>}
        </form>
        
        <div className='mt-5 space-y-3'>
        <Link href="/forget" className='underline'>Forget Password</Link>
        <h3>Don't Have An Account? <Link href="/signup" className=' underline text-[var(--secondary)]'>SignUp</Link></h3>
        </div>
      </div>
    </>
  )
}

export default login
