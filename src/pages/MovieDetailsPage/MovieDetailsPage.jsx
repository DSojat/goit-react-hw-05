import { Outlet, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getMovieById } from '../../tmdb-api';

import css from './MoviesDetails.module.css';

export default function MoviesDetails() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    if (Object.keys(movie).length) return;
    const fetchData = async () => {
      try {
        const data = await getMovieById(movieId);
        // console.log(data);
        setMovie(data);
      } catch (error) {
        // console.log
      }
    };
    fetchData();
  }, [movie]);

  return (
    <>
      <button className={css.button} type="button">
        &#8656; Go back
      </button>
      <div className={css.movieMainBox}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width="420"
          />
        )}
        <div>
          <h1>{movie.title}</h1>
          <p>User score: {Math.ceil(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres && movie.genres.map(({ name }) => name + ' ')}</p>
        </div>
      </div>
      <div className={css.movieAddBox}>
        <p>Additional information</p>
        <Link className={css.link} to="cast">
          Cast
        </Link>
        <Link className={css.link} to="reviews">
          Reviews
        </Link>
        <Outlet></Outlet>
      </div>
    </>
  );
}
