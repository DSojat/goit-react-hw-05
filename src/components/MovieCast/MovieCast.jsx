import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../../tmdb-api';

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState([false, undefined]);

  useEffect(() => {
    if (Object.keys(cast).length) return;
    const fetchData = async () => {
      try {
        const data = await getMovieById(movieId, 'credits');
        if (data.cast.length === 0) {
          throw new Error('We don`t have any cast for this movie');
        }
        if (data.cast.length < 5) {
          setCast(data.cast.slice(0, data.cast.length));
        }
        setCast(data.cast.slice(0, 5));
      } catch (error) {
        setError([true, error.message]);
      }
    };
    fetchData();
  }, [movieId]);
  return (
    <div style={{ marginBottom: '24px' }}>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => (
          <div key={id} style={{ marginBottom: '8px' }}>
            <img
              style={{ paddingLeft: '16px' }}
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              width="120"
            />
            <p>&#9642; {name}</p>
            <p>&#8195;Character: {character}</p>
          </div>
        ))}
      {error[0] && <p>{error[1]}</p>}
    </div>
  );
}
