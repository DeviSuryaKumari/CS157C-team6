"use client";

import React from 'react'
import Navbar from '@/app/components/Navbar'
import FileUpload from '../components/FileUpload';

interface ProfileDetails {
  name: string;
  email: string;
  gender: string;
  profilePicture: string;
  birthDate: string;
  username: string;
}

function page(props: ProfileDetails) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<ProfileDetails>({
    name: props.name,
    email: props.email,
    gender: props.gender,
    profilePicture: props.profilePicture,
    birthDate: props.birthDate,
    username: props.username
  });
  const [profileDetails, setProfileDetails] = React.useState<ProfileDetails>({
    name: '',
    email: '',
    gender: '',
    profilePicture: '',
    birthDate: '',
    username: ''
  });

  const getProfileDetails = async () => { };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    if (name === 'age') { // store age as an integer
      setUser(prev => ({ ...prev, [name]: parseInt(value) }));
      return;
    }
    setUser(prev => ({ ...prev, [name]: value }));
  };
  const handleUpdateProfilePicture = (file: File) => {
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser(prev => ({ ...prev, profilePicture: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    getProfileDetails();
  }, []);


  return (
    <>
      <div className='w-screen h-screen'>
        <Navbar />
        <div className="py-8 my-28">
          {isLoading ? (
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
                        <span className="font-bold text-gray-700 dark:text-gray-300">Current Name - {user.name} </span>
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
                        <span className="font-bold text-gray-700 dark:text-gray-300">Current Email - {user.email} </span>
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
                        <span className="font-bold text-gray-700 dark:text-gray-300">Current Username - {user.username} </span>
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
                    <span className="font-bold text-gray-700 dark:text-gray-300">Birthdate -  {user.birthDate}</span>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Gender - {user.gender}</span>
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

export default page;