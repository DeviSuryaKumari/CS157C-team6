"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-svg-core/styles.css'
import ProgressBar from '../components/ProgressBar';
import Cookies from 'js-cookie';
import axios from 'axios';
import UserCollectionMovieComponent from '../components/UserCollectionMovieComponent';
import GenreSelectionCard from '../components/GenreSelectionCard';

export default function SelectionGame() {
    const username = Cookies.get('username');
    interface User {
        email: string;
        username: string;
        password: string;
        gender: string;
        name: string;
        profilePicture: string;
        dateOfBirth: string;
        initialLogin: boolean;
    };
    const [isUserDetailsRetrieved, setIsUserDetailsRetrieved] = useState<boolean>(false);
    const [userRetrievedDetails, setUserRetrievedDetails] = useState<User>({
        email: "",
        username: "",
        password: "",
        initialLogin: false,
        gender: "",
        name: "",
        dateOfBirth: "",
        profilePicture: ""
    });
    const getUserDetails = async (username: string) => {
        await axios.get('http://localhost:8080/users/by-username', {
            params: {
                username: username
            }
        }).then((response) => {
            setUserRetrievedDetails(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (username !== undefined) {
            getUserDetails(username);
            console.log(userRetrievedDetails);
        }
    }, []);

    useEffect(() => {
        if (userRetrievedDetails.username !== "") {
            setIsUserDetailsRetrieved(true);
        }
    }, [userRetrievedDetails]);

    interface Movie {
        title: string;
        plot: string;
        genres: string[];
        released_year: number;
        rating: number;
        duration: string;
        certificate_type: string;
        rating_count: string;
        poster: string;
    }
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isMoviesRetrieved, setIsMoviesRetrieved] = useState<boolean>(false);

    const getMovies = async () => {
        await axios.get('http://localhost:8080/movies/top50')
            .then((response) => {
                setMovies(response.data);
            }).catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        if(movies.length > 1){
            setIsMoviesRetrieved(true);
        }
    }, [movies]);


    return (
        <>{!isUserDetailsRetrieved ? (
            <div className='w-screen h-screen'>
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600 dark:border-gray-300"></div>
                </div>
            </div>
        ) : (
            <div className='w-screen h-screen'>
                <div className='w-full h-full'>
                    <Navbar profilePicture={userRetrievedDetails.profilePicture} />
                    <div className='flex flex-col justify-center items-center my-12 md:my-24'>
                        <div className='w-11/12 md:w-3/4 h-auto md:h-screen px-5 py-5 rounded-lg'>
                            <ProgressBar />
                            <GenreSelectionCard />
                            {
                                movies.map((movie, index) => {
                                    return <UserCollectionMovieComponent movie={movie} key={index} />
                                })
                            }
                        </div>

                    </div>
                </div >
            </div >
        )
        }
        </>
    )
};

