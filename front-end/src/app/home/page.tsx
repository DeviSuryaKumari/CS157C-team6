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
import { faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-regular-svg-icons';

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

            <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-5'>
                <h1 className="text-4xl text-left text-balance">Recommended Movies</h1>
            </div>
            <div className="flex flex-col mx-auto px-auto bg-slate-700 rounded-lg w-11/12">
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 space-x-3 my-2 justify-center">
                        {/* Repeat this div block for each item in your data array */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        {/* Repeat the above div block for each item */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center w-3/4 mx-auto s:mx-auto md:ms-20 lg:ms-20 my-5'>
                <h1 className="text-4xl text-left text-balance">Top Rated Movies</h1>
            </div>
            <div className="flex flex-col mx-auto px-auto bg-slate-700 rounded-lg w-11/12">
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 space-x-3 my-2 justify-center">
                        {/* Repeat this div block for each item in your data array */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        {/* Repeat the above div block for each item */}
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                        <div className="inline-block px-3">
                            <MovieCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
