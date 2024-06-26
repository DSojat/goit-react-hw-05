import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import fetchMovieList from '../../tmdb-api';

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState([false, undefined]);

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    setError([false, undefined]);
    setMovies([]);
    const fetchData = async () => {
      try {
        const data = await fetchMovieList(query, 1);
        if (data.results.length === 0) {
          throw new Error('No results found');
        }
        setMovies(data.results);
      } catch (error) {
        setError([true, error.message]);
      }
    };
    fetchData();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies}></MovieList>}
      {error[0] && <p style={{ color: 'red' }}>{error[1]}</p>}
    </div>
  );
}
