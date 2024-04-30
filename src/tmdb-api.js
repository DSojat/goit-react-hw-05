import axios from 'axios';

// const limitPage = 16;
let searchParams = '';
let pathParams = '';

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDE3ODBhY2Y5NDQxNDI5Zjg2Nzc0OWVhNTVkMTBmZCIsInN1YiI6IjY2MmU0MWExMjRmMmNlMDEyNjJhYmNmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L514NnKPXzM2VCgS267WCNtnLlmGyGi1nteIGzx9RPA',
  },
};

export default async function fetchMovieList(searchName, page) {
  if (!searchName) {
    axios.defaults.baseURL = 'https://api.themoviedb.org/3/trending/movie/';
    pathParams = 'day';
    searchParams = new URLSearchParams({
      language: 'en-US',
    });
  } else {
    axios.defaults.baseURL = 'https://api.themoviedb.org/3/search/';
    pathParams = 'movie';
    searchParams = new URLSearchParams({
      query: searchName,
      include_adult: 'false',
      language: 'en-US',
      page: page,
    });
  }

  const response = await axios.get(`${pathParams}?${searchParams}`, options);
  return response.data;
}

export async function getMovieById(id) {
  axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie/';
  pathParams = id;
  searchParams = new URLSearchParams({
    language: 'en-US',
  });

  const response = await axios.get(`${pathParams}?${searchParams}`, options);
  return response.data;
}
