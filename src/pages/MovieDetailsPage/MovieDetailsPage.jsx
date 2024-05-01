import {
  Outlet,
  Link,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieById } from '../../tmdb-api';
import css from './MoviesDetails.module.css';

export default function MoviesDetails() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const [error, setError] = useState([false, undefined]);
  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(backLinkHref, { replace: false });
  };

  useEffect(() => {
    if (Object.keys(movie).length) return;
    const fetchData = async () => {
      try {
        const data = await getMovieById(movieId);
        if (data.length === 0) {
          throw new Error(
            'Sorry, something went wrong... Please try again later!'
          );
        }
        setMovie(data);
      } catch (error) {
        setError([true, error.message]);
      }
    };
    fetchData();
  }, [movie]);

  return (
    <>
      {Object.keys(movie).length > 0 && (
        <div>
          <button className={css.button} type="button" onClick={handleClick}>
            &#8656; Go back
          </button>
          <div className={css.movieMainBox}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width="250"
              />
            )}
            <div>
              <h1>{movie.title}</h1>
              <p>User score: {Math.ceil(movie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              <p>
                {movie.genres && movie.genres.map(({ name }) => name + ' ')}
              </p>
            </div>
          </div>
          <div className={css.movieAddBox}>
            <p>Additional information</p>
            <Link className={css.link} to="cast" state={location.state}>
              Cast
            </Link>
            <Link className={css.link} to="reviews" state={location.state}>
              Reviews
            </Link>
          </div>
          <Outlet></Outlet>
        </div>
      )}
      {error[0] && <p style={{ color: 'red' }}>{error[1]}</p>}
    </>
  );
}
