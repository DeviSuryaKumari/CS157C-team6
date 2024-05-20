"use client";
import React, { useState, useEffect, use } from 'react'
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-svg-core/styles.css'
import ProgressBar from '../components/ProgressBar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UserCollectionMovieComponent from '../components/UserCollectionMovieComponent';
import GenreSelectionCard from '../components/GenreSelectionCard';

export default function SelectionGame() {
    const username = Cookies.get('username');
    interface User {
        email: string;
        username: string;
        password: string;
        gender: string;
        name: string;
        profilePicture: string;
        dateOfBirth: string;
        initialLogin: boolean;
    };
    const [isUserDetailsRetrieved, setIsUserDetailsRetrieved] = useState<boolean>(false);
    const [userRetrievedDetails, setUserRetrievedDetails] = useState<User>({
        email: "",
        username: "",
        password: "",
        initialLogin: false,
        gender: "",
        name: "",
        dateOfBirth: "",
        profilePicture: ""
    });
    const getUserDetails = async (username: string) => {
        await axios.get('http://localhost:8080/users/by-username', {
            params: {
                username: username
            }
        }).then((response) => {
            setUserRetrievedDetails(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (username !== undefined) {
            getUserDetails(username);
            console.log(userRetrievedDetails);
        }
    }, []);

    useEffect(() => {
        if (userRetrievedDetails.username !== "") {
            setIsUserDetailsRetrieved(true);
        }
    }, [userRetrievedDetails]);

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
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isMoviesRetrieved, setIsMoviesRetrieved] = useState<boolean>(false);
    const [availableGenres, setAvailableGenres] = useState<string[]>([]);
    const [isGenresSelected, setIsGenresSelected] = useState<boolean>(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [moviesByGenres, setMoviesByGenres] = useState<Movie[]>([]);
    const [isMoviesByGenresRetrieved, setIsMoviesByGenresRetrieved] = useState<boolean>(false);
    const [likedMovies, setLikedMovies] = useState<string[]>([]);
    const [dislikedMovies, setDislikedMovies] = useState<string[]>([]);
    const [progressPercentage, setProgressPercentage] = useState<number>(0);

    const handleLikedMovie = (movie: Movie) => {
        const movieTitle = movie.title;

        // Check if the movie is already in the liked list
        const isAlreadyLiked = likedMovies.includes(movieTitle);

        if (isAlreadyLiked) {
            // If the movie is already liked, remove it from the liked list
            setLikedMovies((prevLikedMovies) => prevLikedMovies.filter((title) => title !== movieTitle));
        } else {
            // If the movie is not liked, add it to the liked list and remove from the disliked list if present
            setLikedMovies((prevLikedMovies) => [...prevLikedMovies, movieTitle]);

            // Remove the movie from the disliked list if present
            setDislikedMovies((prevDislikedMovies) => prevDislikedMovies.filter((title) => title !== movieTitle));
        }
    };

    const handleDislikedMovie = (movie: Movie) => {
        const movieTitle = movie.title;

        // Check if the movie is already in the disliked list
        const isAlreadyDisliked = dislikedMovies.includes(movieTitle);

        if (isAlreadyDisliked) {
            // If the movie is already disliked, remove it from the disliked list
            setDislikedMovies((prevDislikedMovies) => prevDislikedMovies.filter((title) => title !== movieTitle));
        } else {
            // If the movie is not disliked, add it to the disliked list and remove from the liked list if present
            setDislikedMovies((prevDislikedMovies) => [...prevDislikedMovies, movieTitle]);

            // Remove the movie from the liked list if present
            setLikedMovies((prevLikedMovies) => prevLikedMovies.filter((title) => title !== movieTitle));
        }
    };

    const handleSelectedGenres = (selectedGenres: string[]) => {
        if (selectedGenres.length === 5) {
            setIsGenresSelected(true);
        }
    };

    const handleGenreSelect = (genre: string) => {
        if (selectedGenres.length < 5) {
            setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
        }
    };

    const getAvailableGenres = async () => {
        try {
            const response = await axios.get('http://localhost:8080/movies/genres');
            setAvailableGenres(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/movies/top50');
            setMovies(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getDetails = async () => {
            if (isUserDetailsRetrieved) {
                await getAvailableGenres();
                await getMovies();
            }
        };
        getDetails();
    }, [isUserDetailsRetrieved]);

    useEffect(() => {
        if (movies.length > 1) {
            setIsMoviesRetrieved(true);
        }
    }, [movies]);

    useEffect(() => {
        const getMoviesByGenres = async () => {
            if (isGenresSelected && selectedGenres.length === 5) {
                const genresParam = selectedGenres.join(',');
                try {
                    const response = await axios.get('http://localhost:8080/movies/movies-by-genres', {
                        params: { genres: genresParam }
                    });
                    const moviesResponse = response.data;

                    // Filter unique movies by title
                    const uniqueMoviesArray = moviesResponse.filter((movie: Movie, index: number, self: Movie[]) =>
                        index === self.findIndex((m) => m.title === movie.title)
                    );
                    setTotalMovies(uniqueMoviesArray.length);
                    setMoviesByGenres(uniqueMoviesArray);
                    setIsMoviesByGenresRetrieved(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getMoviesByGenres();
    }, [isGenresSelected, selectedGenres]);

    const [totalMovies, setTotalMovies] = useState<number>(0);

    useEffect(() => {
        if (totalMovies > 0) {
            console.log(likedMovies, dislikedMovies);
            const totalSelections = likedMovies.length + dislikedMovies.length;
            setProgressPercentage(totalSelections > 0 ? (totalSelections / totalMovies) * 100 : 0);
        }
    }, [likedMovies, dislikedMovies, totalMovies]);

    const submitLikedMovies = async (likedMovies: string[]) => {
        const params = new URLSearchParams();
        params.append('username', username);
        likedMovies.forEach(movie => params.append('movieTitles', movie));
        await axios.put(`http://localhost:8080/users/like-movies?${params.toString()}`)
        .then((response) => { console.log(response) })
            .catch((error) => { console.log(error); });
    };
    const submitDislikedMovies = async (dislikedMovies: string[]) => {
        //const dislikedMoviesParam = likedMovies.join(',');
        const params = new URLSearchParams();
        params.append('username', username);
        dislikedMovies.forEach(movie => params.append('movieTitles', movie));
        await axios.put(`http://localhost:8080/users/dislike-movies?${params.toString()}`)
        .then((response) => { console.log(response) })
            .catch((error) => { console.log(error); });
    };

    const [isBuildingRecommendations, setIsBuildingRecommendations] = useState<boolean>(false);
    const [isMovieRelationshipsBuilt, setIsMovieRelationshipsBuilt] = useState<boolean>(false);

    useEffect(() => {
        const buildLikedDislikedMovies = async () => {
            if (progressPercentage === 100) {
                setIsBuildingRecommendations(true);
                await submitLikedMovies(likedMovies);
                await submitDislikedMovies(dislikedMovies);
                setIsMovieRelationshipsBuilt(true);
            }
        };
        buildLikedDislikedMovies();
    }, [progressPercentage]);

    const [isRecommendationsRetrieved, setIsRecommendationsRetrieved] = useState<boolean>(false);
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const getRecommendedMovies = async () => {
        await axios.get(`http://localhost:8080/movies/recommendations/${username}`)
            .then((response) => {
                console.log(response)
                setRecommendedMovies(response.data);
                setIsRecommendationsRetrieved(true);
            }).catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const getRecommendations = async () => {
            if (isMovieRelationshipsBuilt) {
                await getRecommendedMovies();
            }
        };
        getRecommendations();
    }, [isMovieRelationshipsBuilt]);

    const [isInitialLoginUpdated, setIsInitialLoginUpdated] = useState<boolean>(false);
    const updateIsIntitialLogin = async () => {
        await axios.put(`http://localhost:8080/users/update-initial-login?username=${username}`).then(() => {setIsInitialLoginUpdated(true);})
            .catch((error) => {console.log(error);});

    }

    useEffect(() => {
        if(isRecommendationsRetrieved && recommendedMovies.length > 0) {
            updateIsIntitialLogin(); // Recommended movies retrieved, update initial login status
        }
    }, [isRecommendationsRetrieved]);

    const router = useRouter();

    useEffect(() => {
        if(isInitialLoginUpdated) {
            router.push('/home'); // Redirect to home page after initial login status is updated
        }
    }, [isInitialLoginUpdated]);

    return (
        <>{!isUserDetailsRetrieved && isMoviesRetrieved ? (
            <div className='w-screen h-screen'>
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600 dark:border-gray-300"></div>
                </div>
            </div>
        ) : (
            <div className='w-screen h-screen'>
                <div className='w-full h-full'>
                    <Navbar profilePicture={userRetrievedDetails.profilePicture} />
                    <div className='flex flex-col justify-center items-center my-12 md:my-24'>
                        <div className='w-11/12 md:w-3/4 h-auto md:h-screen px-5 py-5 rounded-lg'>
                            <div className='fixed w-3/4 top-20'>
                                <ProgressBar progressPercentage={progressPercentage} />
                            </div>

                            <GenreSelectionCard
                                genres={availableGenres}
                                handleSelectedGenres={handleSelectedGenres}
                                parentHandleGenreSelect={handleGenreSelect} />
                            {isMoviesByGenresRetrieved && (
                                <div className='flex flex-col items-center justify-center mx-2'>
                                    {moviesByGenres.map((movie) => (
                                        <UserCollectionMovieComponent movie={movie} handleLike={handleLikedMovie} handleDislike={handleDislikedMovie} />
                                    ))}
                                </div>
                            )
                            }
                        </div>

                    </div>
                </div >
            </div >
        )
        }
        </>
    )
};

