import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import fetchMovieList from '../../tmdb-api';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //    if (!topicValue) return;
    const fetchData = async () => {
      try {
        const data = await fetchMovieList();
        console.log(data.results);
        if (data.results.length === 0) {
          throw new Error('No results found');
        }
        setMovies(data.results);
        // if (page === 1) {
        //   setTotalPages(data.total_pages);
        //   setImages(data.results);
        // } else {
        //   setImages([...images, ...data.results]);
        // }
      } catch (error) {
        // setError([true, error.message]);
        // loadMore && setLoadMore(false);
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, []);

  return <MovieList movies={movies}></MovieList>;
}
