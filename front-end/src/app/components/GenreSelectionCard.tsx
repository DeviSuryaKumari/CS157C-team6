import React, { useEffect, useState } from 'react';
import GenreBadge from './GenreBadge';

interface GenreSelectionCardProps {
    genres: string[];
    handleSelectedGenres: (selectedGenres:string[]) => void;
    parentHandleGenreSelect: (genre: string) => void;
}

export default function GenreSelectionCard({ genres, handleSelectedGenres, parentHandleGenreSelect }: GenreSelectionCardProps) {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [showCard, setShowCard] = useState(true);

    const handleGenreSelect = (genre: string) => {
        if (selectedGenres.length < 5) {
            setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
            parentHandleGenreSelect(genre);
        }
    };

    const handleCardClose = () => {
        setShowCard(false);
    };

    useEffect(() => {
        if(selectedGenres.length === 5) {
            setShowCard(false);
            handleSelectedGenres(selectedGenres);
        }
    }, [selectedGenres]);

    return (
        <>
            {showCard && (
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-white text-balance">
                            Select Your Top 5 Favorite Movie Genres
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            {genres.map((genre) => (
                                <GenreBadge
                                    key={genre}
                                    genre={genre}
                                    onSelect={handleGenreSelect}
                                    disabled={selectedGenres.includes(genre)}
                                />
                            ))}
                        </div>
                        {selectedGenres.length >= 5 && (
                            <button
                                onClick={handleCardClose}
                                className="block mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
