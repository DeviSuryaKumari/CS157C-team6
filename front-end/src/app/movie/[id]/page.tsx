"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import Navbar from '../../components/Navbar';
import CommentList from '../../components/CommentList';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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


export default function Movie() {
    

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

    const params = useParams<{ id: string }>();
    const movieTitle = params.id;
    console.log(movieTitle);
    const [movie, setMovie] = useState<Movie>({
        title: "",
        plot: "",
        genres: [],
        released_year: 0,
        rating: 0,
        duration: "",
        certificate_type: "",
        rating_count: "",
        poster: ""
    });
    const [isMovieDetailsRetrieved, setIsMovieDetailsRetrieved] = useState<boolean>(false);

    const getMovieDetails = async (movieTitle: string) => {
        await axios.get(`http://localhost:8080/movies/${movieTitle}`, {
        }).then((response) => {
            setMovie(response.data);
            setIsMovieDetailsRetrieved(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        const getMovie = async () => {
            await getMovieDetails(movieTitle);
        };
        getMovie();
    }, []);

    useEffect(() => {
        if(movie.title !== "") {
            setIsMovieDetailsRetrieved(true);
            console.log(movie);
        }
    }, [movie]);

    return (
        <div className='w-screen h-screen'>
            <Navbar profilePicture={userRetrievedDetails.profilePicture} />
            <div className="py-8 my-28">
                {!isUserDetailsRetrieved && isMovieDetailsRetrieved ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600 dark:border-gray-300"></div>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 max-w-fit">
                                    <img className="w-full h-full object-contain" src={movie.poster} alt="Movie Image" />
                                </div>
                                <div className="flex -mx-2 mb-4">
                                    <div className="w-1/2 px-2">
                                    <Link href="\home"><button className="w-full bg-blue-500 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Home</button></Link>
                                    </div>
                                    <div className="w-1/2 px-2">
                                        <button className="w-full bg-yellow-600 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Watch Later</button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{movie.title}</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {movie.plot}
                                </p>
                                <div className='flex justify-between items-center my-3'>
                                    <div className=''>
                                        
                                        <span className='text-gray-300 font-semibold'>Rating: <FontAwesomeIcon icon={faStar} size='sm' className='text-yellow-500 mr-1' />{movie.rating}</span>
                                    </div>
                                    <div>
                                        <span className='text-gray-300 font-semibold'>{movie.rating_count} Ratings</span>
                                    </div>
                                    <div>
                                        <span className='text-gray-300 font-semibold'>Duration: {movie.duration}</span>
                                    </div>
                                    
                                </div>
                                
                                <div className="mb-4">
                                    <span className="font-bold text-gray-300">Director(s):</span>
                                    <div className="flex items-center mt-2">
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-300">Actor(s):</span>
                                    <div className="flex items-center mt-2">
                                        
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Genres(s):</span>
                                    <div className="flex items-center mt-2">
                                        {
                                            movie.genres.map((genre, index) => (
                                                <span key={index} className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-900 text-blue-300">{genre}</span>
                                            ))
                                    
                                        
                                        }
                                    </div>
                                </div>
                                <div>
                                    <CommentList />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


