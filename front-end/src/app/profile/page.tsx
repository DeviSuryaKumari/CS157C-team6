"use client";

import React, {useState, useEffect} from 'react'
import Navbar from '@/app/components/Navbar'
import FileUpload from '../components/FileUpload';
import Cookies from 'js-cookie';
import axios from 'axios';

interface UserRetrievedDetails {
  email: string;
  username: string;
  password: string;
  gender: string;
  name: string;
  profilePicture?: string;
  dateOfBirth: string;
  initialLogin?: boolean;
};


export default function page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUserDetailsRetrieved, setIsUserDetailsRetrieved] = useState<boolean>(false);
    interface UserRetrievedDetails {
        email: string;
        username: string;
        password: string;
        gender: string;
        name: string;
        profilePicture?: string;
        dateOfBirth: string;
        initialLogin?: boolean;
      };
    const [userRetrievedDetails, setUserRetrievedDetails] = useState<UserRetrievedDetails>({
        email: "",
        username: "",
        password: "",
        initialLogin: false,
        gender: "",
        name: "",
        dateOfBirth: ""
    });
    const username = Cookies.get('username');

    const getUserDetails = async (username: string) => {
        await axios.get('http://localhost:8080/users/by-username', {
          params: {
            username: username
          }
        }).then((response) => {
            setUserRetrievedDetails(response.data);
            setIsUserDetailsRetrieved(true);
        }).catch((error) => {
            console.log(error);
        });
    };
    
    useEffect(() => {
        if(username !== undefined){
            getUserDetails(username);
        }
    }, []);

    useEffect(() => {
        console.log(userRetrievedDetails);
    }, [userRetrievedDetails]);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {}

    const handleUpdateProfilePicture = (file: File) => {}

  return (
    <>
      <div className='w-screen h-screen'>
        <Navbar/>
        <div className="py-8 my-28">
          {!isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600 dark:border-gray-300"></div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-contain" src="/logo.png" alt="Movie Image" />
                  </div>

                </div>
                <div className="md:flex-1 px-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Name</h2>
                    <div className="flex items-center justify-center mt-2 w-full">
                      <div className="w-3/4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Current Name - {userRetrievedDetails.name} </span>
                        <div className='my-2'>
                          <span className="font-bold text-gray-700 dark:text-gray-300">Update Name </span>
                          <input
                            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2 text-black"
                            type="text"
                            name="name"
                            placeholder={"Update Name:"}
                            onChange={handleUserInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="mb-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Email</span>
                    <div className="flex items-center justify-center mt-2 w-full">
                      <div className="w-3/4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Current Email - {userRetrievedDetails.email} </span>
                        <div className='my-2'>
                          <span className="font-bold text-gray-700 dark:text-gray-300">Update Email </span>
                          <input
                            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2 text-black"
                            type="email"
                            name="email"
                            placeholder={"Update Email:"}
                            onChange={handleUserInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Username</span>
                    <div className="flex items-center justify-center mt-2 w-full">
                      <div className="w-3/4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Current Username - {userRetrievedDetails.username} </span>
                        <div className='my-2'>
                          <span className="font-bold text-gray-700 dark:text-gray-300">Update Username </span>
                          <input
                            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2 text-black"
                            type="text"
                            name="username"
                            placeholder={"Update Username:"}
                            onChange={handleUserInput}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Birthdate -  {userRetrievedDetails.dateOfBirth}</span>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Gender - {userRetrievedDetails.gender.replace(userRetrievedDetails.gender.charAt(0), userRetrievedDetails.gender.charAt(0).toUpperCase() )}</span>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Edit Profile Picture</span>
                    <div className='mt-3'>
                      <FileUpload onFileUpload={handleUpdateProfilePicture} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
