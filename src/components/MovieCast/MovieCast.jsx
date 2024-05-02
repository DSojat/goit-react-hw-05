import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../../tmdb-api';

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState([false, undefined]);
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    if (cast.length) return;
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
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : defaultImg
              }
              alt={name}
              width="120"
            />
            <p>&#9642; {name}</p>
            {character && <p>&#8195;Character: {character}</p>}
          </div>
        ))}
      {error[0] && <p>{error[1]}</p>}
    </div>
  );
}
