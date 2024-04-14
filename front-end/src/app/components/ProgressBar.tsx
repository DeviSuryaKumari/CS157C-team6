import React from 'react'

export default function ProgressBar() {
    return (
        <>

            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-white">User Preference Collection</span>
                <span className="text-sm font-medium text-blue-700 dark:text-white">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-500">
                <div className="bg-blue-600 h-2.5 rounded-full w-44" ></div>
            </div>

        </>

    )
};