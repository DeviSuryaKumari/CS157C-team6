"use client";

import React, { useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-regular-svg-icons'

export default function Home() {
    interface Item {
        img: StaticImageData;
        desc: string;
        buttonIcon: StaticImageData;
    }

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

    const [isExpandedRecommended, setIsExpandedRecommended] = useState(false);
    const [isExpandedTopRated, setIsExpandedTopRated] = useState(false);

    const toggleCollapseRecommended = () => {
        setIsExpandedRecommended(!isExpandedRecommended);
    };

    const toggleCollapseTopRated = () => {
        setIsExpandedTopRated(!isExpandedTopRated);
    };

    return (
        <div className="h-screen w-screen overflow-scroll overflow-x-hidden">
            <Navbar />
            <div className="justify-center items-center mt-52 mx-5">
                <Carousel items={items} />
            </div>

            {/* Recommended Movies Section */}
            <div className='mx-auto my-auto text-start px-5'>
                <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-10'>
                    <h1 className="text-4xl text-left text-balance border-opacity-70 border border-slate-100 border-t-0 border-l-0 border-r-0 border-b-1">Recommended Movies</h1>
                    {/* Collapse/Expand button */}
                    <button className="w-20 h-14 hover:outline rounded bg-slate-600" onClick={toggleCollapseRecommended}>
                        {isExpandedRecommended ? <FontAwesomeIcon icon={faCaretSquareUp} className="py-15" color='white' size='lg' /> : <FontAwesomeIcon icon={faCaretSquareDown} color='white' size='lg'/>}
                    </button>
                </div>
                <div className="flex flex-wrap rounded-lg justify-evenly items-center mb-14 px-20 bg-slate-600">
                    {/* For large screens, show 3 cards per row */}
                    <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                        <MovieCard />
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                        <MovieCard />
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                        <MovieCard />
                    </div>
                    {/* Additional cards are collapsed if not expanded */}
                    {isExpandedRecommended && (
                        <>
                            <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                                <MovieCard />
                            </div>
                            <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                                <MovieCard />
                            </div>
                            {/* Add more MovieCard components as needed */}
                        </>
                    )}
                </div>
            </div>

            {/* Top Rated Movies Section */}
            <div className='mx-auto text-start px-5 pb-20'>
                <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-10'>
                    <h1 className="text-4xl text-left text-balance border-opacity-70 border border-slate-100 border-t-0 border-l-0 border-r-0 border-b-1">Top Rated Movies</h1>

                    <button className="w-20 h-14 hover:outline rounded bg-slate-600" onClick={toggleCollapseTopRated}>
                        {isExpandedTopRated ? <FontAwesomeIcon icon={faCaretSquareUp} className="py-15" color='white' size='lg' /> : <FontAwesomeIcon icon={faCaretSquareDown} color='white' size='lg'/>}
                    </button>
                </div>
                <div className="flex flex-wrap rounded-lg justify-evenly items-center mb-14 px-20 bg-slate-600">
                    {/* For large screens, show 3 cards per row */}
                    <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                        <MovieCard />
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                        <MovieCard />
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                        <MovieCard />
                    </div>
                    {/* Additional cards are collapsed if not expanded */}
                    {isExpandedTopRated && (
                        <>
                            <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                                <MovieCard />
                            </div>
                            <div className="lg:w-1/3 md:w-1/2 w-full my-4">
                                <MovieCard />
                            </div>
                            {/* Add more MovieCard components as needed */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
