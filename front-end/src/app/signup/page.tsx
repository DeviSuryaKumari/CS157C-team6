"use client";

import React, { useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DatePicker from '../components/DatePicker';
import FileUpload from '../components/FileUpload';

export default function signup() {
    interface User {
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
        age: number | null;
        gender: string;
        name: string;
        profilePicture?: string;
        birthDate: string;
    };
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        age: null,
        gender: '',
        birthDate: ''
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [name, value] = [e.target.name, e.target.value];
        if(name === 'age') { // store age as an integer
            setUser(prev => ({ ...prev, [name]: parseInt(value) }));
            return;
        }
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (file: File) => {
        console.log(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setUser(prev => ({ ...prev, profilePicture: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleBirthDateChange = (date: string) => {
        setUser(prev => ({ ...prev, birthDate: date }));
    }

    return (
        <div className="min-h-screen text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-slate-700 shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <a href="/">
                            <Image src="/logo.png" className="mx-auto" alt="Image" width={350} height={350} />
                        </a>

                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-100">
                            Sign up
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            

                            <div className="mx-auto max-w-xs">
                            <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" name="name" placeholder="Name" onChange={handleUserInput}/>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email" name="email" placeholder="Email" onChange={handleUserInput}/>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" name="username" placeholder="Username" onChange={handleUserInput}/>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" name="password" placeholder="Password" onChange={handleUserInput}/>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleUserInput}/>
                                <DatePicker handleDateChange={handleBirthDateChange}/>

                                <label className="block text-lg font-medium  text-gray-100 mb-2 mt-5">Select Gender</label>

                                <div className="flex items-center py-2 px-2 border-slate-100  border rounded-lg mt-3">
                                    <input id="male" onChange={handleUserInput} type="radio" value="male" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                                    <label htmlFor="male" className="ms-2 text-sm font-medium text-gray-100">Male</label>
                                </div>
                                <div className="flex items-center py-2 px-2 border-slate-100  border rounded-lg mt-3">
                                    <input id="female" onChange={handleUserInput} type="radio" value="female" name="gender" className="w-4 h-4 text-blue-600  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="female" className="ms-2 text-sm font-medium text-gray-100">Female</label>
                                </div>
                                <div className="flex items-center py-2 px-2 border-slate-100  border rounded-lg mt-3">
                                    <input id="other" onChange={handleUserInput} type="radio" value="other" name="gender" className="w-4 h-4 text-blue-600  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="other" className="ms-2 text-sm font-medium text-gray-100">Other</label>
                                </div>
                                <label className="block text-lg font-medium  text-gray-100 mb-2 mt-5">Upload Profile Picture</label>
                                <FileUpload onFileUpload={handleFileUpload}/>
                                <Link href="/home">
                                    <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                </Link>
                                <p className="mt-6 text-sm text-blue-400 text-center">
                                    <a href="/" className="border-b border-gray-500 border-dotted">
                                        Already have an account? Login Here
                                    </a>

                                </p>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="flex-1 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/SignUp.avif")', borderRadius: '25px' }}>
                    </div>
                </div>

            </div>

        </div>
    );
}

