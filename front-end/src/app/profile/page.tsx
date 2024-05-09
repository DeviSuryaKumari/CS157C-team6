"use client";

import React, { useState, useEffect, use } from 'react'
import Navbar from '@/app/components/Navbar'
import FileUpload from '../components/FileUpload';
import Cookies from 'js-cookie';
import axios from 'axios';
import AWS from 'aws-sdk';



export default function page() {
  const [isUserDetailsRetrieved, setIsUserDetailsRetrieved] = useState<boolean>(false);
  interface UserRetrievedDetails {
    email: string;
    username: string;
    password: string;
    gender: string;
    name: string;
    profilePicture: string;
    dateOfBirth: string;
    initialLogin: boolean;
  };
  interface UpdatedUserDetails {
    name?: string;
    email?: string;
    username?: string;
    profilePicture?: string;
  }
  const [userRetrievedDetails, setUserRetrievedDetails] = useState<UserRetrievedDetails>({
    email: "",
    username: "",
    password: "",
    initialLogin: false,
    gender: "",
    name: "",
    dateOfBirth: "",
    profilePicture: ""
  });

  const [updatedUserDetails, setUpdatedUserDetails] = useState<UpdatedUserDetails>({
    name: "",
    email: "",
    username: "",
    profilePicture: ""
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
    if (username !== undefined) {
      getUserDetails(username);

    }
  }, []);


  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserDetails(prev => ({ ...prev, [name]: value }));
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
      accessKeyId: 'ACCESS_KEY',
      secretAccessKey: 'SECRET_KEY',
      region: 'us-west-1',
    });

    const params = {
      Bucket: 'popcorn-picks',
      Key: `${username}_${selectedFile.name.substring(0, selectedFile.name.indexOf("."))}_${Date.now()}.${selectedFileExtension}`,
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



  const handleUserUpdate = async () => {

    if (!updatedUserDetails.name && !updatedUserDetails.email && !updatedUserDetails.username && !selectedFile) {
      alert('Please enter at least one field to update');
      return;
    }

    await createUpdatedUserDetails();
    try {
      if (selectedFile) { // If a new profile picture is selected, upload it to S3, then update the user details
        const profilePicURL = await handleUpload();
        if (profilePicURL) {
          await axios.put('http://localhost:8080/users/update', { ...userRetrievedDetails, profilePicture: profilePicURL });
          alert('User details updated successfully');
        } else {
          alert('Error updating user details');
        }
      } else {
        await axios.put('http://localhost:8080/users/update', userRetrievedDetails); // If no new profile picture is selected, update the user details
        alert('User details updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const createUpdatedUserDetails = async () => {
    setUserRetrievedDetails((prev) => {
      const updatedDetails = { ...prev };

      // Iterate through the keys of updatedUserDetails
      for (const key in updatedUserDetails) {
        // Check if the value is not null, undefined, or an empty string
        if (updatedUserDetails[key as keyof UpdatedUserDetails]?.trim()) {
          // Add the key-value pair to updatedDetails
          updatedDetails[key as keyof UpdatedUserDetails] = updatedUserDetails[key as keyof UpdatedUserDetails]!;
        }
      }

      return updatedDetails;
    });
  };


  useEffect(() => { // Update the profile picture URL in the user object when a new file is selected
    if (selectedFile) {
      const selectedFileExtension = selectedFile.name.split('.').pop();
      const profilePicURL = `https://popcorn-picks.s3.us-west-1.amazonaws.com/${username}_${selectedFile.name.substring(0, selectedFile.name.indexOf("."))}_${Date.now()}.${selectedFileExtension}`
      setUpdatedUserDetails((prev) => ({ ...prev, profilePicture: profilePicURL }));
    }
  }, [selectedFile]);




  return (
    <>
      <div className='w-screen h-screen'>
        <Navbar profilePicture={userRetrievedDetails.profilePicture} />
        <div className="py-8 my-28">
          {!isUserDetailsRetrieved ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600 dark:border-gray-300"></div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-fill" src={userRetrievedDetails.profilePicture} alt="Movie Image" />
                  </div>
                  <div className="w-1/2 px-2">
                    <button onClick={handleUserUpdate} className="w-full bg-blue-600 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Update Profile</button>
                  </div>
                </div>
                <div className="md:flex-1 px-4">
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Name</span>
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
                    <span className="font-bold text-gray-700 dark:text-gray-300">Password</span>
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
                    <span className="font-bold text-gray-700 dark:text-gray-300">Birthdate -  {userRetrievedDetails.dateOfBirth}</span>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Gender - {userRetrievedDetails.gender.replace(userRetrievedDetails.gender.charAt(0), userRetrievedDetails.gender.charAt(0).toUpperCase())}</span>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Edit Profile Picture</span>
                    <div className='mt-3'>
                      <FileUpload onFileUpload={handleFileChange} />
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
