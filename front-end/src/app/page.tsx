"use client";

import React, { useState } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


const LoginPage = () => {
  interface User {
    username: string;
    password: string;
    remember: boolean;
  }


  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    remember: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value
    }));
  };


  return (
    <div className="flex flex-col my-5 justify-center items-center lg:flex-row h-screen bg-slate-900 w-screen">
      {/* Left Column */}
      <div className="relative mt-5 w-full lg:w-1/2 h-full justify-center items-center flex flex-col text-center">
        <img className="w-3/4" src="/logo.png" alt="PopcornPicks" />
        {/* Hide text content on mobile */}
        <div className="hidden lg:block text-center">
          <h1 className="text-7xl text-gray-100 w-fit font-mono mt-12">
            <span className="before:absolute before:inset-0 before:bg-slate-900 before:animate-typewriter">
              Welcome to PopcornPicks
            </span>
          </h1>
          {/* Center the paragraph text */}
          <p className="text-sm w-3/4 text-balance text-gray-300 font-mono mt-6 mx-auto">
            <span>
              Popcorn Picks offers a comprehensive solution for all your movie cravings, serving as your ultimate destination for cinematic delight. With a vast film catalog spanning various genres, eras, and styles, we cater to diverse tastes and preferences. Our advanced recommendation algorithm analyzes your viewing history, preferences, and ratings to deliver tailor-made suggestions just for you. Whether you're a fan of gripping thrillers, heartwarming dramas, or laugh-out-loud comedies, our algorithm ensures that each recommendation resonates with your unique cinematic palate.
            </span>
          </p>
        </div>
      </div>


      {/* Right Column */}
      <div className="lg:flex w-1/2 h-full flex-col justify-center items-center">
        {/* Content for right column */}
        <div className="w-full sm:w-3/4 max-h-full bg-slate-700 rounded-lg p-6 overflow-auto">
          <div className='h-full flex flex-col justify-between'>
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
            <form action="#" method="POST" className="flex flex-col space-y-4">
              {/* Username Input */}
              <div className="flex flex-col">
                <label htmlFor="username" className="mb-1">Username</label>
                <input type="text" onChange={handleInputChange} id="username" name="username" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
              </div>
              {/* Password Input */}
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1">Password</label>
                <input type="password" onChange={handleInputChange} id="password" name="password" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
              </div>
              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input type="checkbox" onChange={handleInputChange} id="remember" name="remember" className="text-blue-500" />
                <label htmlFor="remember" className="ml-2">Remember Me</label>
              </div>
              {/* Forgot Password Link */}
              <div className="text-blue-500">
                <a href="#" className="hover:underline">Forgot Password?</a>
              </div>
              {/* Login Button */}
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4">Login</button>
            </form>
            {/* Sign up Link */}
            <div className="text-blue-500 text-center my-3">
              <a href="/signup" className="hover:underline">Don't have an account? Sign Up Here</a>
            </div>
          </div>
        </div>
      </div>


    </div>


  );
};

export default LoginPage;
