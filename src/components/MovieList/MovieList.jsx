import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <>
      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id} className={css.li}>
              <Link to={`/movies/${id}`} state={location} className={css.link}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
