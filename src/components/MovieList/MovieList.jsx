import { Link } from 'react-router-dom';

export default function MovieList({ movies }) {
  return (
    <>
      <h3>Trending today</h3>
      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => (
            <div key={id}>
              <Link to={`${id}`}>{title}</Link>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
