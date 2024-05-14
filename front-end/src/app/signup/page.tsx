"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import DatePicker from '../components/DatePicker';
import FileUpload from '../components/FileUpload';
import { useRouter } from 'next/navigation';
import AWS from 'aws-sdk';


export default function signup() {
    interface User {
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
        gender: string;
        profilePicture: string;
        age: number;
        initialLogin: boolean;
    };
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [user, setUser] = useState<User>({
        username: '',
        password: '',
        email: '',
        initialLogin: true,
        confirmPassword: '',
        age: 0,
        gender: '',
        profilePicture: 'https://popcorn-picks.s3.us-west-1.amazonaws.com/default_profile_pic.jpg', // Default profile picture if none is provided
    });
    const [successfulAccountCreation, setSuccessfulAccountCreation] = useState<boolean>(false);
    const router = useRouter();


    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({ ...prev, gender: e.target.value }));
    }
    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const handleBirthDateChange = (date: string) => {
        setDateOfBirth(date);
        setUser(prev => ({ ...prev, age: calculateAge(date) }));
    }

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/jpg') {
            alert('Please upload a valid image file. Supported formats are PNG, JPEG, and JPG.');
          } else {
            setSelectedFile(event.target.files[0]);
          }
    
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
    
        const selectedFileExtension = selectedFile.name.split('.').pop();
        const s3 = new AWS.S3({
            accessKeyId: '',
            secretAccessKey: '',
            region: 'us-west-1',
          });
    
        const params = {
            Bucket: 'popcorn-picks',
            Key: `${user.username}_${selectedFile.name.substring(0, selectedFile.name.indexOf("."))}_${Date.now()}.${selectedFileExtension}`,
            Body: selectedFile
        };
    
        try {
            const data = await s3.upload(params).promise(); // Wait for the upload to finish
            return data.Location; // Return the URL of the uploaded image
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle the error here, e.g., display an error message to the user
            return null; // Return null if there was an error
        }
    }
    


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Check if all required fields are filled in
        if ( user.email !== '' && user.username !== '' && user.password !== '' && user.confirmPassword !== '' && user.age !== 0 && user.gender !== '') {
            if (user.password !== user.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            createUser(user);
        } else {
            alert('Please fill in all required fields');
            return;
        }


    }
    const createUser = async (user: User) => {
        // Remove confirmPassword from user object
        const { confirmPassword, ...userData } = user;
        try {
            if(selectedFile) {
                const profilePicURL = await handleUpload();
                if (profilePicURL) {
                    await axios.put('http://localhost:8080/users/create', { ...userData, profilePicture: profilePicURL });
                    setSuccessfulAccountCreation(true);
                } else {
                    alert('An error occurred while uploading the profile picture. Please try again');
                    return;
                }

            }
            
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again');
        }
    };


    useEffect(() => {
        if (successfulAccountCreation) {
            router.push('/');
        }
    }, [successfulAccountCreation]);



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
                                    type="email" name="email" placeholder="Email" onChange={handleUserInput} />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" name="username" placeholder="Username" onChange={handleUserInput} />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" name="password" placeholder="Password" onChange={handleUserInput} />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleUserInput} />
                                <DatePicker handleDateChange={handleBirthDateChange} />

                                <label className="block text-lg font-medium  text-gray-100 mb-2 mt-5">Select Gender</label>

                                <div className="flex items-center py-2 px-2 border-slate-100  border rounded-lg mt-3">
                                    <input id="male" onChange={handleGenderChange} type="radio" value="male" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" />
                                    <label htmlFor="male" className="ms-2 text-sm font-medium text-gray-100">Male</label>
                                </div>
                                <div className="flex items-center py-2 px-2 border-slate-100  border rounded-lg mt-3">
                                    <input id="female" onChange={handleGenderChange} type="radio" value="female" name="gender" className="w-4 h-4 text-blue-600  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="female" className="ms-2 text-sm font-medium text-gray-100">Female</label>
                                </div>
                                <div className="flex items-center py-2 px-2 border-slate-100  border rounded-lg mt-3">
                                    <input id="other" onChange={handleGenderChange} type="radio" value="other" name="gender" className="w-4 h-4 text-blue-600  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="other" className="ms-2 text-sm font-medium text-gray-100">Other</label>
                                </div>
                                <label className="block text-lg font-medium  text-gray-100 mb-2 mt-5">Upload Profile Picture</label>
                                <FileUpload onFileUpload={handleFileChange} />

                                <button
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={handleSubmit}
                                >
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">Sign Up</span>
                                </button>

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

