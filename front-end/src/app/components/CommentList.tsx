import React from 'react'
import Comment from './Comment'

export default function CommentList() {
    return (
        <section className=" py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Reviews (20)</h2>
                </div>
                <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your review</label>
                        <textarea id="comment" rows={6}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Write a review..." required></textarea>
                    </div>
                    <button type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Leave a review
                    </button>
                </form>
                <div className='overflow-scroll h-52'>
                    <Comment
                        name="Helene Engels"
                        date="2022-06-23"
                        comment='Thanks for sharing this. I do came from the Backend development and explored some of 
                    the tools to design my Side Projects.' />
                    <Comment
                        name="Helene Engels"
                        date="2022-06-23"
                        comment='Thanks for sharing this. I do came from the Backend development and explored some of 
                    the tools to design my Side Projects.' />
                    <Comment
                        name="Helene Engels"
                        date="2022-06-23"
                        comment='Thanks for sharing this. I do came from the Backend development and explored some of 
                    the tools to design my Side Projects.' />
                    <Comment
                        name="Helene Engels"
                        date="2022-06-23"
                        comment='Thanks for sharing this. I do came from the Backend development and explored some of 
                    the tools to design my Side Projects.' />
                    <Comment
                        name="Helene Engels"
                        date="2022-06-23"
                        comment='Thanks for sharing this. I do came from the Backend development and explored some of 
                    the tools to design my Side Projects.' />
                </div>

            </div>
        </section>
    )
};

