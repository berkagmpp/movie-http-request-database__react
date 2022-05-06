import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);

    function fetchMoviesHandler() {
        fetch('https://swapi.dev/api/films').then(response => {
            return response.json();
        }).then(data => {
            const transformedMovies = data.results.map(movieData => {   //match json data and MovisList.js
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    releaseDate: movieData.release_date,
                    openingText: movieData.opening_crawl
                };
            })
            setMovies(transformedMovies);    // if fetch json data sucessfully, set data.results(array format) as new Movies state
        });
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movies} />
            </section>
        </React.Fragment>
    );
}

export default App;