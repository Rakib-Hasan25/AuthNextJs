"use client";

/*
in nextjs bydefault everything is server Component 
everything in nextjs compile on server and we get as user 
just only html,css and javascript(precooked) ,
but when use react hook we have to write "use client"
*/

import React, { Component, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
// axios handle error state

export default function SignUpPage() {
  const router = useRouter();
  // two type router
  // 1.router
  // 2.navigation
  // we want from navigation

  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("successfully signed up");
      setLoading(false)
      console.log("signup successful", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("signUp failed");
      toast.error("error.message");
    }
  };

  //if there is changes in "user" object then the callback functon will be called
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold font-sans text-[50px] mb-5 ">{loading ? "processing" : "SignUp"}</h1>
      <hr />

      <label htmlFor="username">username</label>
      <input
        className="p-2 text-black  border  border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        name=""
        id="username"
        value={user.username}

        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      {/* setUser({...user,username:e.target.value}) 
           here ('...user'=> means we destructued the object 'user' ,, and set the user object one key (username) ) */}
      <label htmlFor="email">email</label>
      <input
        className="p-2  text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        name=""
        id="email"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2  text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        name=""
        id="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />



      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      onClick={onSignUp}
      >
        {buttonDisabled ?"No signup":"signup"}
        {/* if ready for sign up then it will show "signup" */}

      </button>


      <Link href="/login"> visit login page</Link>
    </div>
  );
}
