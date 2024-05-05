"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import { StaticImageData } from 'next/image';
import Image1 from '../../../public/logo.png';
import Image2 from '../../../public/logo.png';
import Image3 from '../../../public/logo.png';
import ButtonIcon1 from '../../../public/logo.png';
import ButtonIcon2 from '../../../public/logo.png';
import ButtonIcon3 from '../../../public/logo.png';
import MovieCard from '../components/MovieCard';
import '@fortawesome/fontawesome-svg-core/styles.css'
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Home() {
    interface Item {
        img: StaticImageData;
        desc: string;
        buttonIcon: StaticImageData;
    }
    interface User {
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
        gender: string;
        name: string;
        profilePicture?: string;
        dateOfBirth: string;
        is_initial_login?: boolean;
    };
    const items: Item[] = [
        {
            img: Image1,
            desc: 'Description 1',
            buttonIcon: ButtonIcon1
        },
        {
            img: Image2,
            desc: 'Description 2',
            buttonIcon: ButtonIcon2
        },
        {
            img: Image3,
            desc: 'Description 3',
            buttonIcon: ButtonIcon3
        },
        {
            img: Image3,
            desc: 'Description 4',
            buttonIcon: ButtonIcon3
        }
    ];

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
        


    return (
        <>
        { !isUserDetailsRetrieved ?  (
            <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        ):(
            <div className="h-screen w-screen overflow-scroll overflow-x-hidden">
            
            <Navbar/>
            <div className="justify-center items-center mt-52 mx-5">
                <Carousel items={items} />
            </div>

            <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-5'>
                <h1 className="text-4xl text-left text-balance">Recommended Movies</h1>
            </div>
            <div className="flex flex-col mx-auto px-auto rounded-lg w-11/12">
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 space-x-3 my-2 justify-center">
                        {/* Repeat this div block for each item in your data array */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        {/* Repeat the above div block for each item */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-5'>
                <h1 className="text-4xl text-left text-balance">Watch Later</h1>
            </div>
            <div className="flex flex-col mx-auto px-auto rounded-lg w-11/12">
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 space-x-3 my-2 justify-center">
                        {/* Repeat this div block for each item in your data array */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        {/* Repeat the above div block for each item */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-5'>
                <h1 className="text-4xl text-left text-balance">Top Rated Movies</h1>
            </div>
            <div className="flex flex-col mx-auto px-auto  rounded-lg w-11/12">
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 space-x-3 my-2 justify-center">
                        {/* Repeat this div block for each item in your data array */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        {/* Repeat the above div block for each item */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    );
}
