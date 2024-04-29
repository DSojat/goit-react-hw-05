import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <>
      <h3>Trending today</h3>
      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => (
            <div key={id}>
              <Link to={`/movies/${id}`} className={css.link}>
                {title}
              </Link>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
