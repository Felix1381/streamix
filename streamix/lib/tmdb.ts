const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.results;
};

export const getPopularMovies = async () => {
  return fetchMovies("/movie/popular");
};

export const getNowPlayingMovies = async () => {
  return fetchMovies("/movie/now_playing");
};

export const getTopRatedMovies = async () => {
  return fetchMovies("/movie/top_rated");
};