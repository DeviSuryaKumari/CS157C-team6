"use client";
import React, { useState } from 'react';

interface CommentProps {
    name: string;
    date: string;
    comment: string;
}

export default function Comment({ name, date, comment }: CommentProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleCollapse = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <article className="p-6 text-base border-t border-gray-200 dark:border-gray-700 ">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                            alt="Helene Engels"
                        />
                        {name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime={date} title={date}>
                            {date}
                        </time>
                    </p>
                </div>
                <button
                    id="dropdownComment4Button"
                    data-dropdown-toggle="dropdownComment4"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                    onClick={toggleCollapse}
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                {isExpanded && (
                    <div
                        id="dropdownComment4"
                        className="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" // Added right-0 for right alignment
                    >
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li>
                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                            </li>
                        </ul>
                    </div>
                )}

                
            </footer>



            <p className="text-gray-500 dark:text-gray-400">{comment}</p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                </button>
            </div>
        </article>
    );
}


