"use client"
import React, { useState } from 'react'
import  Link  from 'next/link'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db} from '../../../../utils/firebase'
import { setDoc,collection, doc } from 'firebase/firestore'
import {toast} from "react-hot-toast"
function Signup() {
  const router =useRouter()
  const[svalues,setsvalues]=useState({email:"",password:"",fullname:"",cpassword:""})
  const[errors,seterror]=useState({})
  const handleval=(e)=>{
    const{name,value}=e.target
    setsvalues({...svalues,[name]:value})
  }
  const validation=()=>{
    let err={}
    if(!svalues.fullname) err.fullname="Enter Firstname"
    if(!svalues.email) err.email="Enter Email"
    if(!svalues.password) err.password="Enter Password"
    if(svalues.password!==svalues.cpassword) err.cpassword="Mismatch Confirm Password"

    return err
  }
  const handlelog= async ()=>{
    const errorResults=validation();
    if(Object.keys(errorResults).length>0){
      seterror(errorResults)
    }else{
      try{
      await createUserWithEmailAndPassword(auth,svalues.email,svalues.password)
      const user=auth.currentUser
      if(user){
        toast.success("Successfully Registerd!")
        await setDoc(doc(db,"users",user.uid),{
          email:user.email,
          fullname:svalues.fullname
        })

      }
      setsvalues({email:"",password:"",fullname:"",cpassword:""})
       router.replace("/login")
      
    }
      catch(error){
        toast.error(error.message)
      }
    }
    
  }
  return (
    <>
      <div className='border-2 bg-white border-[var(--imp-color)] w-1/3 mt-10  mx-auto text-center p-8'>
        <h1 className='text-gradient text-[3rem] font-extrabold mb-5'>SignUp</h1>
        <form action="" onSubmit={(e)=>e.preventDefault()} className='flex flex-col space-y-5'>
          <input type="text" placeholder='FullName' value={svalues.fullname} onChange={handleval} name='fullname' className={`border-2 focus:outline-none h-12 p-5 ${errors.fullname ? 'border-red-600' : ''}`} />
          <input type="email" placeholder='Email' value={svalues.email} onChange={handleval} name='email' className={`border-2 focus:outline-none h-12 p-5 ${errors.email ? 'border-red-600' : ''}`} />
          <input type="password" placeholder='Password' value={svalues.password} onChange={handleval} name='password'  className={`border-2 focus:outline-none h-12 p-5 ${errors.password ? 'border-red-600' : ''}`}/>
          <input type="password" placeholder='Confirm Password' value={svalues.cpassword} onChange={handleval} name='cpassword'  className={`border-2 focus:outline-none h-12 p-5 ${errors.cpassword ? 'border-red-600' : ''}`}/>
          <button type="submit" onClick={handlelog} className='bg-[var(--imp-color)] py-2 text-white text-xl'>SignUp</button>
        </form>
        <h3 className='mt-5'>Already Have An Account? <Link href="/login" className=' text-[var(--secondary)] underline text-end'>Login</Link></h3>
      </div>
    </>
  )
}

export default Signup
