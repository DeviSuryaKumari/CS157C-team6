import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Movie {
    movie_id: number;
    movie_title: string;
    plot: string;
    genres: string[];
    released_year: number;
    rating: number;
    poster: string;
    duration: string;
    certificate_type: string;
    rating_count: string;
}

interface MovieProps{
    movie: Movie;
}
export default function MovieCard({ movie }: MovieProps) {

    
    const handleViewDetails = () => {
        window.location.href = `/movie/${movie.movie_id}`;
    };

    return (
        <div className="w-full max-w-sm hover:outline border border-gray-200 rounded-lg shadow dark:border-gray-700 ">
        <a href="#">
            <img onClick={handleViewDetails} className="p-8 rounded-t-lg" src="/logo.png" alt="Movie image" />
        </a>
        <div className="px-5 pb-5 text-center">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{movie.movie_title}</h5>
            </a>
            <div className="justify-evenly items-center mt-2.5 mb-5 text-start">
                <p className='text-sm text-gray-100 font-semibold my-2'>Duration: {movie.duration} </p>
                <p className='text-sm text-gray-100 font-semibold my-2'>Released: {movie.released_year}</p>
                <div className='flex justify-between items-center'>
                        <div className=''>
                            <FontAwesomeIcon icon={faStar} size='lg' className='text-yellow-500 mr-2' />
                            <span className='text-gray-400 font-normal'>{movie.rating}</span>
                        </div>
                        <div>
                            <span className='text-gray-400 font-normal'>{movie.rating_count} Ratings</span>
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
