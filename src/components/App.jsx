import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import Home from '../pages/HomePage/HomePage';
import Movies from '../pages/MoviesPage/MoviesPage';
import MovieDetails from '../pages/MovieDetailsPage/MovieDetailsPage';
import NotFound from '../pages/NotFoundPage/NotFoundPage';

import Navigation from './Navigation/Navigation';
// import MovieCast from './MovieCast/MovieCast';
// import MovieReviews from './MovieReviews/MovieReviews';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          {/* <Route path="/movies/:movieId/cast" element={<MovieCast />} /> */}
          {/* <Route path="/movies/:movieId/reviews" element={<MovieReviews />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
