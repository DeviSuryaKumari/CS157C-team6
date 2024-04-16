"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import Navbar from '@/app/components/Navbar';
import CommentList from '@/app/components/CommentList';

interface MovieDetails {
    title: string;
    description: string;
    directors: { name: string }[];
    actors: { name: string }[];
    rating: number;
}

export default function Movie() {
    const params = useParams<{ id: string }>();
    const movieTitle = params.id.toString();
    const [isLoading, setIsLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState<MovieDetails>({
        title: movieTitle,
        description: '',
        directors: [],
        actors: [],
        rating: 0.0
    });

    useEffect(() => {
        getMovieDetails();
    }, []);

    const getMovieDetails = async () => {
        setIsLoading(true);
        try {
            console.log('Fetching movie details...');
            const response = await fetch(`http://localhost:8080/movies/by-title?title=${movieTitle}`);
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const movie = await response.json();
            setMovieDetails({
                title: movieTitle,
                description: movie.description,
                directors: movie.directors,
                actors: movie.actors,
                rating: 5.0 // Hardcoded for now
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                                    <img className="w-full h-full object-contain" src="\logo.png" alt="Movie Image" />
                                </div>
                                <div className="flex -mx-2 mb-4">
                                    <div className="w-1/2 px-2">
                                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"><Link href="/home">Home</Link></button>
                                    </div>
                                    <div className="w-1/2 px-2">
                                        <button className="w-full bg-yellow-600 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Watch Later</button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{movieDetails.title.replaceAll('%20', ' ')}</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {movieDetails.description}
                                </p>
                                <div className="flex mb-4">
                                    <div className="flex justify-between mt-5 row-span-1">
                                        <div className="flex items-center mt-2.5 mb-5 justify-center">
                                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">Rating: 5.0</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Director(s):</span>
                                    <div className="flex items-center mt-2">
                                        {movieDetails.directors.length > 0 ? (
                                            <div className='py-3 '>
                                                <span key='directors' className='text-gray-600 dark:text-gray-300 text-sm px-3 py-3 justify-evenly'>
                                                    {movieDetails.directors.map((director) => director.name).join(', ')}
                                                </span>
                                            </div>
                                        ) : (
                                            <p className='text-gray-600 dark:text-gray-300 text-sm px-3 py-3'>No directors found</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Actor(s):</span>
                                    <div className="flex items-center mt-2">
                                        {movieDetails.actors.length > 0 ? (
                                            <div className='px-3 py-3'>
                                                <span key='actors' className='text-gray-600 dark:text-gray-300 text-sm py-3 justify-evenly'>
                                                    {movieDetails.actors.map((actor) => actor.name).join(', ')}
                                                </span>
                                            </div>
                                        ) : (
                                            <p className='text-gray-600 dark:text-gray-300 text-sm px-3 py-3'>No actors found</p>
                                        )}
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


