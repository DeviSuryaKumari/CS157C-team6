"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import MovieCard from '../components/MovieCard';
import '@fortawesome/fontawesome-svg-core/styles.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Home() {
    interface Item {
        img: string;
        desc: string;
    }
    const [isMoviesRetrieved, setIsMoviesRetrieved] = useState<boolean>(false);


    const [isUserDetailsRetrieved, setIsUserDetailsRetrieved] = useState<boolean>(false);
    interface UserRetrievedDetails {
        email: string;
        username: string;
        password: string;
        gender: string;
        profilePicture: string;
        age: number;
        initialLogin: boolean;
    };
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


    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [watchLaterMovies, setWatchLaterMovies] = useState<Movie[]>([]);
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const [userRetrievedDetails, setUserRetrievedDetails] = useState<UserRetrievedDetails>({
        email: "",
        username: "",
        password: "",
        initialLogin: false,
        gender: "",
        age: 0,
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
    const getTopRatedMovies = async () => {
        await axios.get('http://localhost:8080/movies/top50').then((response) => {
            setTopRatedMovies(response.data);
            setIsMoviesRetrieved(true);
        }).catch((error) => {
            console.log(error);
        });
    };
    const getRecommendedMovies = async () => {
        await axios.get(`http://localhost:8080/movies/recommendations/${username}`).then((response) => {
            setRecommendedMovies(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    const getWatchLaterMovies = async () => {
        await axios.get(`http://localhost:8080/movies/watch-later-movies?username=${username}`).then((response) => {
            setWatchLaterMovies(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    
    }
    useEffect(() => {
        const getMovies = async () => {
            await getTopRatedMovies();
            await getRecommendedMovies();
            await getWatchLaterMovies();
            setIsMoviesRetrieved(true);
        };
        getMovies();
    }, []);


    const [carrouselItems, setCarrouselItems] = useState<Item[] | null>([

    ]);

    const createItemsForCarrousel = (top5RatedMovies: Movie[]) => {
        const items: Item[] = [];
        top5RatedMovies.forEach((movie) => {
            let item: Item = {
                img: movie.poster,
                desc: movie.title
            };
            items.push(item);
        });
        setCarrouselItems(items);
    }


    useEffect(() => {
        if (topRatedMovies.length > 0) {
            const top5RatedMoves = topRatedMovies.slice(0, 5);
            createItemsForCarrousel(top5RatedMoves);
        }
    }, [topRatedMovies]);

    useEffect(() => {
        if (userRetrievedDetails.username !== "") {
            setIsUserDetailsRetrieved(true);

        }
    }, [userRetrievedDetails]);






    return (
        <>
            {!isUserDetailsRetrieved && !isMoviesRetrieved ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <div role="status" className="flex items-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            ) : (
                <div className="h-screen w-screen overflow-scroll overflow-x-hidden">
                    <Link href="/home#/"> {/* Scroll to top of the page */}
                        <div id="/">

                        </div>
                    </Link>
                    <Navbar profilePicture={userRetrievedDetails.profilePicture} />

                    <div className="justify-center items-center mt-52 mx-5" id="carousel">
                        <Carousel items={carrouselItems!!} />
                    </div>

                    <Link href="/home#recommended">
                        <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-5' id="recommended">
                            <h1 className="text-4xl text-left text-balance">Recommended Movies</h1>
                        </div>
                    </Link>
                    <div className="flex flex-col mx-auto px-auto rounded-lg w-11/12" id="recommended">
                        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                            {recommendedMovies.length > 0 ? (
                                <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 space-x-3 my-2 justify-center">
                                    {recommendedMovies.map((movie, index) => {
                                        return (
                                            <div key={index} className="inline-block px-3 w-64">
                                                <MovieCard movie={movie} />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="w-full flex justify-center items-center">
                                    <h1 className="text-2xl text-white text-center">No recommended movies</h1>
                                </div>
                            )}
                        </div>
                    </div>

                    <Link href="/home#watch-later">
                        <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-5' id="watch-later">
                            <h1 className="text-4xl text-left text-balance">Watch Later</h1>
                        </div>
                    </Link>
                    <div className="flex flex-col mx-auto px-auto rounded-lg w-11/12" id="recommended">
                        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                            {watchLaterMovies.length > 0 ? (
                                <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 space-x-3 my-2 justify-center">
                                    {watchLaterMovies.map((movie, index) => {
                                        return (
                                            <div key={index} className="inline-block px-3 w-64">
                                                <MovieCard movie={movie} />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="w-full flex justify-center items-center">
                                    <h1 className="text-2xl text-white text-center">There are no movies in your watch later list</h1>
                                </div>
                            )}
                        </div>
                    </div>

                    <Link href="/home#top-rated">
                        <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-5' id="top-rated">
                            <h1 className="text-4xl text-left text-balance">Top Rated Movies</h1>
                        </div>
                    </Link>
                    <div className="flex flex-col mx-auto px-auto  rounded-lg w-11/12">
                        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                            <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 space-x-3 my-2 justify-center scrollbar-thumb-gray-700">

                                {
                                    topRatedMovies.map((movie, index) => {
                                        return (
                                            <div key={index} className="inline-block px-3 w-64">
                                                <MovieCard movie={movie} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
