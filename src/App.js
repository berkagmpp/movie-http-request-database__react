import React, { useState, useEffect, useCallback } from 'react';

import AddMovie from './components/AddMovie'
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {    // with useCallback(), we can reload without infinite loop
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://swapi.dev/api/films');

            if (!response.ok) {
                throw new Error('Somthing went wrong!');
            }

            const data = await response.json();
    
            const transformedMovies = data.results.map(movieData => {   //match json data and MovisList.js
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    releaseDate: movieData.release_date,
                    openingText: movieData.opening_crawl
                };
            });
            setMovies(transformedMovies);    
            
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, []);

    const addMovieHandler = movie => {
        console.log(movie);
    }

    let content = <p>Found no movies.</p>;
    
    if (movies.length > 0) {
        content = <MoviesList movies={movies} />;
    };

    if (error) {
        content = <p>{error}</p>;
    };

    if (isLoading) {
        content = <p>Loading...</p>;
    };

    return (
        <React.Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
};

export default App;