import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovies';
import useFetchHttps from './hooks/use-fetchHttp';

import './App.css'

function App() {
  const [movies, setMovies] = useState([]);

  const transformMovies = moviesObj => {
    const loadedMovies = [];

    for (const key in moviesObj) {
      loadedMovies.push({
        id: key,
        title: moviesObj[key].title,
        openingText: moviesObj[key].openingText,
        releaseDate: moviesObj[key].releaseDate,
      });
    }
    setMovies(loadedMovies);
  }

  const moviesData = useFetchHttps(
    { url: 'https://react-https-edc4d-default-rtdb.firebaseio.com/movies.json' },
    transformMovies
  )

  const { isLoading, error, sendRequests: fetchMovies } = moviesData;
  console.log(moviesData);

  useEffect(() => {
    fetchMovies()
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-https-edc4d-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;