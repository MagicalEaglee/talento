"use client"
import Nav from "@/components/Nav";
import Image from "next/image";
import Link from "next/link";
import { auth,db } from "../../utils/firebase";
import { getDoc,doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast"


export default function Home() {
  const[userdata,setuserd]=useState({})
  const[islogin,setlogin]=useState(false)
  const fetchdata= async ()=>{
   try{
   await auth.onAuthStateChanged(async (user)=>{
      if(user){
        const docref= doc(db,"users",user.uid);
      const docsnap=await getDoc(docref)
      if(docsnap.exists()){
        setuserd(docsnap.data())
        setlogin(true)
      }
      }
    })
   }catch(error){
    console.log(error.message)
   }
  }
  useEffect(()=>{
    fetchdata()
  },[])
  const userlogout=async ()=>{
    try {
      await auth.signOut();
      toast.success("Logout Successfully!")
      setuserd({})
      setlogin(false)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
   <>
   <Nav login={islogin} logout={userlogout}/>
    {
      userdata ? <h1>Hi!, {userdata.fullname}</h1> : <h1>Please Login</h1>
    }
    
   </>
  );
}
