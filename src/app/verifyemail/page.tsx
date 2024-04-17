'use client'

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-hot-toast";
// import { useRouter } from 'next/router';
import Link from 'next/link';
export default function verifyEmailPage() {

// const router = useRouter()


  const [token,setToken]=useState("")
  const [verified,setVerified] = useState(false)
  const[error,setError]= useState(false)
  


//there always problem in extracting url from the browser for different type of special characters



  const verifyUserEmail = async()=>{
    try{
        await axios.post("/api/users/verifyemail",{token})
        setVerified(true)
        setError(false)

    }catch(err:any){
        setError(true)

        toast.error(err.message)
    }
  }


  /*

=>window.location means url which we click
search is a perameter of that url ( or the )



=>window.location.search: This part retrieves the query string of the current URL.
 In a URL, the query string is everything after the question mark (?)
 It typically contains key-value pairs


=> https://example.com/page?name=John&age=30, window.location.search will be  ?name=John'




  
  */

useEffect(()=>{
    //it will work when user click from the email 
    setError(false)
const urlToken = window.location.search.split("=")[1]
setToken(urlToken|| "")



//now we will do the same work using nextjs



/*
router = useRouter: This line imports the useRouter hook from the Next.js next/router module and assigns it to the variable router.
 The useRouter hook is a Next.js hook used for accessing the router object and its properties.

const {query} = router: This line uses object destructuring to extract the query object from
 the router object obtained from the useRouter hook. The query object contains the parsed query parameters (key-value pairs) from the URL.

For example, if the URL is https://example.com/page?token=abc123, query will be { token: 'abc123' }.




*/





// const {query} = router   //it get the query 
// const urlToken2 =query.token 


},[])


useEffect(()=>{
    setError(false)

  if(token.length>0){
    verifyUserEmail()
  }
},[token])



  
    return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl font-bold'>Verify email</h1>

        <h2 className='p-2 bg-orange-500 text-black mt-5 mb-5'>
            {token?`${token}`:"no token"}
        </h2>

        {
            verified && (
                <div className=' justify-center  text-center'>
                    <h2 className='text-xl mb-5'>Verified</h2>
                    <Link className='text-3xl font-sans border border-gray-200 p-3' href="/login">Visit Login Page </Link>
                </div>
            )
        }


{
            error && (
                <div className=' justify-center text-center'>
                    <h2 className='text-xl mb-5'>error</h2>
                    <Link className='text-3xl font-sans border border-gray-200 p-3' href="/login"> Visit Login Page </Link>
                </div>
            )
        }

        </div>
  )
}
