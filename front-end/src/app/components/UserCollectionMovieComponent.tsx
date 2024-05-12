import React from 'react'
import Navbar from './Navbar';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';

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
interface UserCollectionMovieProps {
    movie: Movie;
}
export default function UserCollectionMovieComponent({ movie }: UserCollectionMovieProps) {
    return (
        <>
            <div className='flex flex-col items-center md:flex-row justify-between my-5 border border-gray-500 rounded-lg py-5'>
                <img src={movie.poster} alt={`${movie.title} poster`} className='w-1/3 md:w-1/4 mb-3 md:mb-0 mx-3' />
                <div className='flex flex-col justify-between items-start ml-3'>
                    <div>
                        <h2 className='text-xl font-bold'>{movie.title}</h2>
                        <p className='text-gray-300'>{movie.plot}</p>
                    </div>
                    <div className='flex justify-between items-center w-full mt-3'>
                        <div>
                            <FontAwesomeIcon icon={faCalendarAlt} size='lg' className='text-gray-400 mr-2' />
                            <span className='text-gray-400'>{movie.released_year}</span>
                        </div>
                        <div>
                            <span className='text-gray-400'>Rated: {movie.certificate_type}</span>
                        </div>
                        <div className='mr-3'>
                            <FontAwesomeIcon icon={faClock} size='lg' className='text-gray-400 mr-2' />
                            <span className='text-gray-400'>{movie.duration}</span>
                        </div>
                    </div>
                    <div className='flex justify-evenly items-center mt-3'>
                        <FontAwesomeIcon icon={faThumbsUp} size='2x' className='text-green-500 border rounded-lg px-3 py-3 hover:bg-slate-600 mx-3 hover:cursor-pointer' />
                        <FontAwesomeIcon icon={faThumbsDown} size='2x' className='text-red-500 border rounded-lg px-3 py-3 hover:bg-slate-600 mx-3 hover:cursor-pointer' />

                    </div>
                </div>
            </div>
        </>


    )
};