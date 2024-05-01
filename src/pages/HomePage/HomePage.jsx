import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import fetchMovieList from '../../tmdb-api';
import css from './HomePage.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState([false, undefined]);

  useEffect(() => {
    if (movies.length) return;
    const fetchData = async () => {
      try {
        const data = await fetchMovieList();
        if (data.results.length === 0) {
          throw new Error(
            'Sorry, something went wrong... Please try again later!'
          );
        }
        setMovies(data.results);
      } catch (error) {
        setError([true, error.message]);
      }
    };
    fetchData();
  }, [movies]);

  return (
    <>
      <h3 className={css.title}>Trending today</h3>
      {movies.length > 0 && <MovieList movies={movies}></MovieList>}
      {error[0] && <p style={{ color: 'red' }}>{error[1]}</p>}
    </>
  );
}
