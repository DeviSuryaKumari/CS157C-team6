"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'remember') {
      setRemember(!remember);
    }
  }



  return (
    
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className='absolute left-32 top-24 z-10'>
        <Image src="/logo.png" width={500} height={500} alt="Popcorn" layout="fixed" /> {/* Specify layout="fixed" */}
      </div>
      <div className="w-1/2 h-screen hidden lg:flex items-center justify-center relative">
        <section className="h-full w-full flex flex-col justify-center items-center text-center relative">
          <div className='container my-6 text-center'>
            <h1 className="text-7xl text-gray-100 w-fit font-mono mt-12">
              <span className="before:absolute before:inset-0 before:bg-slate-900 before:animate-typewriter">
                Welcome to PopcornPicks
              </span>
            </h1>
          </div>
          <p className="text-sm text-start text-balance text-gray-300 w-4/6 mx-5 font-mono mt-6 px-6">
            <span>
              Popcorn Picks offers a comprehensive solution for all your movie cravings, serving as your ultimate destination for cinematic delight. With a vast film catalog spanning various genres, eras, and styles, we cater to diverse tastes and preferences. Our advanced recommendation algorithm analyzes your viewing history, preferences, and ratings to deliver tailor-made suggestions just for you. Whether you're a fan of gripping thrillers, heartwarming dramas, or laugh-out-loud comedies, our algorithm ensures that each recommendation resonates with your unique cinematic palate.
            </span>
          </p>
        </section>
      </div>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full border-2 lg:w-1/2 mr-12 rounded-lg border-gray-700 bg-slate-800">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form action="#" method="POST">
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block">Username</label>
            <input type="text" onChange={handleInputChange} id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black" autoComplete="off" />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block ">Password</label>
            <input type="password" onChange={handleInputChange} id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black" autoComplete="off" />
          </div>
          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" onChange={handleInputChange} id="remember" name="remember" className="text-blue-500" />
            <label htmlFor="remember" className="ml-2">Remember Me</label>
          </div>
          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>
          {/* Login Button */}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
        </form>
        {/* Sign up  Link */}
        <div className="mt-6 text-blue-500 text-center">
          <a href="/signup" className="hover:underline">Dont have an account? Sign Up Here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
