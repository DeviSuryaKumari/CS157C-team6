import React from 'react'
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import ProgressBar from '../components/ProgressBar';

export default function SelectionGame() {
    return (
        <div className='w-screen h-screen'>
    <div className='w-full h-full'>
        <Navbar />
        <div className='flex flex-col justify-center items-center my-12 md:my-24'>
            <div className='w-11/12 md:w-3/4 h-auto md:h-screen px-5 py-5 rounded-lg'>
                <ProgressBar />
                <div className='flex flex-col items-center md:flex-row justify-between my-5 border border-gray-500 rounded-lg py-5'>
                    <img src="/logo.png" alt="PopcornPicks" className='w-1/3 md:w-1/4 mb-3 md:mb-0 mx-3' />
                    <div className='flex justify-evenly items-center mt-3 md:mt-0'>
                        <FontAwesomeIcon icon={faThumbsUp} size='2x' className='text-green-500 border rounded-lg px-3 py-3 hover:bg-slate-600 mx-3 md:mr-5 hover:cursor-pointer' />
                        <FontAwesomeIcon icon={faThumbsDown} size='2x' className='text-red-500 border rounded-lg px-3 py-3 hover:bg-slate-600 mx-3 md:ml-5 hover:cursor-pointer' />
                        <button className='bg-slate-600 border text-white text-lg mx-3 px-3 py-2 rounded-lg hover:bg-slate-700 flex items-center'>
                            Skip
                            <img src='/skip.png' alt='Skip Icon' className='w-10 h-10 ml-2' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    )
};

