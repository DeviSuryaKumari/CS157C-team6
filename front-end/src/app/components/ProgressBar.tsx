import React from 'react'

interface ProgressBarProps {
    progressPercentage: number;
}

export default function ProgressBar({ progressPercentage }: ProgressBarProps) {
    // Determine the color based on progress percentage
    const getProgressBarColor = (percentage: number) => {
        if (percentage >= 75) {
            return 'bg-green-500'; // Green color for progress >= 75%
        } else if (percentage >= 50) {
            return 'bg-yellow-500'; // Yellow color for progress >= 50%
        } else {
            return 'bg-red-500'; // Red color for progress < 50%
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-white">User Preference Collection</span>
                <span className="text-sm font-medium text-white">{Math.floor(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-500" id="progress-bar">
                <div className={`h-2.5 rounded-full ${getProgressBarColor(progressPercentage)}`} style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>
    );
}
