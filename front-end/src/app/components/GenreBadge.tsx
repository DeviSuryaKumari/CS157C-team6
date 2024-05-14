import React from 'react';

interface GenreBadgeProps {
    genre: string;
    onSelect: (genre: string) => void;
    disabled: boolean;
}

const GenreBadge: React.FC<GenreBadgeProps> = ({ genre, onSelect, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            onSelect(genre);
        }
    };

    return (
        <span
            className={`bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-200'
            }`}
            onClick={handleClick}
        >
            {genre}
        </span>
    );
};

export default GenreBadge;
