import React, {use, useState, useEffect} from 'react';
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
interface Movie {
    id: number;
    title: string;
    plot: string;
    genres: string[];
    releasedYear: number;
    rating: number;
    duration: string;
    certificateType: string;
    ratingCount: string;
}

interface MovieProps{
    movie: Movie;
}
export default function MovieCard({ movie }: MovieProps) {
    const handleViewDetails = () => {
        window.location.href = `/movie/${movie.id}`;
    };

    return (
        <div className="w-full  min-w-fit max-w-sm hover:outline border border-gray-200 rounded-lg shadow dark:border-gray-700">
            <a href="#">
                <img onClick={handleViewDetails} className="p-8 rounded-t-lg" src="/logo.png" alt="Movie image" />
            </a>
            <div className="px-5 pb-5 text-center">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                </a>
                <div className="justify-evenly items-center mt-2.5 mb-5 text-start">
                    <p className=' text-lg text-gray-100 font-semibold my-2'>Duration: {movie.duration} </p>
                    <p className='text-lg text-gray-100 font-semibold my-2'>Released: {movie.releasedYear}</p>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <span className='text-gray-100 text-sm font-normal'>Rating: <FontAwesomeIcon icon={faStar} size='lg' className='text-yellow-500 mr-2' /><span className='text-gray-400'>{movie.rating}</span></span>
                            <span className='text-gray-100 text-sm font-normal mx-2'>Ratings: <span className='text-gray-400'>{movie.ratingCount} </span></span>
                            <span className='text-gray-100 text-sm font-normal'>Rated: <span className='text-gray-400'>{movie.certificateType}</span></span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button onClick={handleViewDetails} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Details</button>
                </div>
            </div>
        </div>
    );
};

