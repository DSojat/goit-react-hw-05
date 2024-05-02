import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../../tmdb-api';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState([false, undefined]);

  useEffect(() => {
    if (Object.keys(reviews).length) return;
    const fetchData = async () => {
      try {
        const data = await getMovieById(movieId, 'reviews');
        if (data.results.length === 0) {
          throw new Error('We don`t have any reviews for this movie');
        }
        setReviews(data.results);
      } catch (error) {
        setError([true, error.message]);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <div style={{ marginBottom: '24px' }}>
      {reviews &&
        reviews.map(({ id, author, content }) => (
          <div key={id} style={{ marginBottom: '8px' }}>
            <h4>&#9642; Author: {author}</h4>
            <p>{content}</p>
          </div>
        ))}
      {error[0] && <p>{error[1]}</p>}
    </div>
  );
}
