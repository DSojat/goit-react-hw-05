import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <>
      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`} className={css.link}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
