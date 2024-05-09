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
        description: string;
        genre: string;
        releaseDate: string;
        rating: number;
        poster: string;
    }

    let movie: Movie = {
        title: "The Shawshank Redemption",
        description: "Two imprisoned",
        genre: "Drama",
        releaseDate: "1994",
        rating: 9.3,
        poster: "https://www.imdb.com/title/tt0111161/mediaviewer/rm4259061760/"
    }

    let movie2: Movie = {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: "Crime",
        releaseDate: "1972",
        rating: 9.2,
        poster: "https://www.imdb.com/title/tt0068646/mediaviewer/rm4249895680/"
    }

    let movie3: Movie = {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        genre: "Action",
        releaseDate: "2008",
        rating: 9.0,
        poster: "https://www.imdb.com/title/tt0468569/mediaviewer/rm4249895680/"
    }
    const movies = [movie, movie2, movie3];

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

