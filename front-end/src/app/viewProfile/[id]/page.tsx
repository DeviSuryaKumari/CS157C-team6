"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function Page() {
  const [isUserDetailsRetrieved, setIsUserDetailsRetrieved] = useState<boolean>(false);

  interface UserRetrievedDetails {
    username: string;
    gender: string;
    profilePicture: string;
    age: number;
  }

  interface LoggedInUser {
    username: string;
    profilePicture: string;
  }

  const [userRetrievedDetails, setUserRetrievedDetails] = useState<UserRetrievedDetails>({
    username: "",
    gender: "",
    age: 0,
    profilePicture: ""
  });

  const params = useParams<{ id: string }>();
  const username = params.id;

  const getViewingProfileDetails = async (username: string) => {
    try {
      const response = await axios.get('http://localhost:8080/users/by-username', {
        params: {
          username: username
        }
      });
      setUserRetrievedDetails(response.data);
      setIsUserDetailsRetrieved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getLoggedInProfileDetails = async (username: string) => {
    try {
      const response = await axios.get('http://localhost:8080/users/by-username', {
        params: {
          username: username
        }
      });
      setLoggedInUser(response.data);
      setIsLoggedUserDetailsRetrieved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loggedInUsername = Cookies.get('username');

  useEffect(() => {
    if (username !== undefined && loggedInUsername !== undefined) {
      getViewingProfileDetails(username);
      getLoggedInProfileDetails(loggedInUsername);
    }
  }, []);

  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    username: "",
    profilePicture: ""
  });

  const [isLoggedUserDetailsRetrieved, setIsLoggedUserDetailsRetrieved] = useState<boolean>(false);

  const followUser = async () => {
    await axios.put(`http://localhost:8080/users/follow?followerUsername=${loggedInUser.username}&followedUsername=${userRetrievedDetails.username}`)
        .then((response) => {
            console.log(response.data);
            alert("User followed successfully!");
        }).catch((error) => {
            console.log(error);
        });
    };

  return (
    <>
      <div className='w-screen h-screen'>
        {isLoggedUserDetailsRetrieved && (
          <Navbar profilePicture={loggedInUser.profilePicture} />
        )}

        <div className="py-8 my-28">
          { !isUserDetailsRetrieved ? ( 
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600 dark:border-gray-300"></div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-fill" src={userRetrievedDetails.profilePicture} alt="User Image" />
                  </div>
                  <div className="w-1/2 px-2">
                    <button onClick={followUser}  className="w-full bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-500">Follow</button>
                  </div>
                </div>
                <div className="md:flex-1 px-4">
                  <div className="mb-6">
                    <span className="font-bold text-gray-300">Username - {userRetrievedDetails.username}</span>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-300">Age - {userRetrievedDetails.age}</span>
                  </div>
                  <div className="mb-6">
                    <span className="font-bold text-gray-300">Gender - {userRetrievedDetails.gender ? userRetrievedDetails.gender.replace(userRetrievedDetails.gender.charAt(0), userRetrievedDetails.gender.charAt(0).toUpperCase()) : "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
