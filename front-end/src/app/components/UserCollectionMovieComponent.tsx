"use client";
import React, { useState } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

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
    handleLike: (movie: Movie) => void;
    handleDislike: (movie: Movie) => void;
}
export default function UserCollectionMovieComponent({ movie, handleDislike, handleLike }: UserCollectionMovieProps) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleClickLike = () => {
        setLiked(true);
        setDisliked(false);
        handleLike(movie);
    };
    const handleClickDislike = () => {
        setLiked(false);
        setDisliked(true);
        handleDislike(movie);
    };

    return (
        <>
            <div className='min-w-full flex flex-col items-center md:flex-row justify-between my-5 border border-gray-500 rounded-lg py-5'>
                <img src={movie.poster} alt={`${movie.title} poster`} className='w-1/3 md:w-1/4 mb-3 md:mb-0 mx-3' />
                <div className='flex flex-col justify-between items-start ml-3'>
                    <div>
                        <h2 className='text-xl font-bold'>{movie.title}</h2>
                        <p className='text-gray-300'>{movie.plot}</p>
                    </div>
                    <div className='flex justify-between items-center w-full mt-3'>
                        <div className='px-3'>
                            <FontAwesomeIcon icon={faCalendarAlt} size='lg' className='text-gray-400 mr-2' />
                            <span className='text-gray-400'>{movie.released_year}</span>
                        </div>
                        <div className='px-3'>
                            <FontAwesomeIcon icon={faFilm} size='lg' className='text-gray-400 mr-2' />
                            <span className='text-gray-400'>
                                {
                                    movie.genres.map((genre, index) => (
                                        <span key={index}>{genre}{index < movie.genres.length - 1 ? ', ' : ''}</span>
                                    ))
                                }
                            </span>
                        </div>
                        <div className='px-3'>
                            <span className='text-gray-400'>Rated: {movie.certificate_type}</span>
                        </div>
                        <div className='px-3'>
                            <FontAwesomeIcon icon={faClock} size='lg' className='text-gray-400 mr-2' />
                            <span className='text-gray-400'>{movie.duration}</span>
                        </div>
                    </div>
                    <div className="flex justify-evenly items-center mt-3">
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            size="2x"
                            onClick={handleClickLike}
                            className={`border text-green-500 rounded-lg px-3 py-3 hover:bg-slate-600 mx-3 hover:cursor-pointer ${liked ? 'bg-green-300' : ''}`}
                        />
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            size="2x"
                            onClick={handleClickDislike}
                            className={`border text-red-500 rounded-lg px-3 py-3 hover:bg-slate-600 mx-3 hover:cursor-pointer ${disliked ? 'bg-red-300' : ''}`}
                        />
                    </div>
                </div>
            </div>
        </>


    )
};