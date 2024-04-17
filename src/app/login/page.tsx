"use client";



import React, { Component, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
// axios handle error state

export default function LoginPage() {
  const router = useRouter();
 

  const [user, setUser] = useState({ email: "", password: ""});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
     
      toast.success("successfully login");
      setLoading(false)
      console.log("login successful", response.data);

      router.push("/profile");
    } catch (error: any) {
      console.log("login failed");
      setLoading(false)
      toast.error("error.message");
    }
  };

  //if there is changes in "user" object then the callback functon will be called
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold font-sans text-[50px] mb-5 ">{loading ? "processing" : "Login"}</h1>
      <hr />

     
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
      onClick={onLogin}
      >
        {buttonDisabled ?"No login":"login"}
        {/* if ready for sign up then it will show "signup" */}

      </button>


      <Link href="/signup"> visit signup page</Link>
    </div>
  );
}
