"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { auth,db } from '../../../../utils/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import {toast} from "react-hot-toast"
import { getDocs,doc, query, collection, where } from 'firebase/firestore'

function Forget() {
  const router=useRouter()
  const[email,setEmail]=useState("")
  const[errors,seterror]=useState({})
  const handleval=(e)=>{
    setEmail(e.target.value)
  }
  const validation=()=>{
    let err={}
    if(!email) err.email="Enter Email"
    return err
  }
  const handlelog=async ()=>{
    
    const errorResults=validation();
    if(Object.keys(errorResults).length>0){
      seterror(errorResults)
    }else{
      try{
        const usersCollectionRef = collection(db, 'users')
        const q = query(usersCollectionRef, where('email', '==', email))
        const querySnapshot = await getDocs(q)
        if(!querySnapshot.empty){
            await sendPasswordResetEmail(auth,email).then(()=>{
                toast.success("Check Your Mail!")
                router.replace("/login")
            })
        }else{
            toast.error("Email not found")
            seterror({...errors,not:"nott"})
        }
        
      }
      catch(error){
        console.log(error.message)
        toast.error(error.message)
      }
    }
    
  }
  return (
    <>
      <div className='border-2 bg-white border-[var(--imp-color)] w-1/3 mt-24 mx-auto text-center p-10'>
        <h1 className='text-gradient text-[3rem] font-extrabold my-5'>Send Email</h1>
        <form action="" onSubmit={(e)=>e.preventDefault()} className='flex flex-col space-y-5'>
          <input type="email" placeholder='Email' value={email} onChange={handleval} name='email' className={`border-2 focus:outline-none h-12 p-5 ${errors.email ? 'border-red-600' : ''}`} />
          <button type="submit" onClick={handlelog} className=' bg-[var(--imp-color)] py-2 text-white bg-[var(--imp-color)] py-2  text-xl'>Reset Password</button>
          {errors.not && <Link href="/signup" className=' underline'>Signup</Link>}
        </form>
       
      </div>
    </>
  )
}

export default Forget
