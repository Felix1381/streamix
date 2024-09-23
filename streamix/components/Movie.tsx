import { useEffect, useState } from 'react';
import StarRating from './StarRating';

interface MovieProps {
  movieId: string; // Définir le type de movieId
}

const Movie: React.FC<MovieProps> = ({ movieId }) => {
  const [movie, setMovie] = useState<any>(null); // Remplacer "any" par le type approprié si disponible
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const baseUrl = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${movieId}`); // Adapter vers votre API
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du film');
        }

        const data = await response.json();
        setMovie(data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {/* <h2>{movie.title}</h2>
      <p>{movie.description}</p> */}
      {/* Ajoutez d'autres détails du film ici */}
      <div key={movie.idFilm} className="shadow-2xl p-4 rounded outline-none">
            <a style={{ cursor: 'pointer' }}>
              <img
                src={baseUrl + movie.image}
                alt={movie.title}
                className="w-full h-auto rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <StarRating rating={movie.vote_average ? parseFloat(movie.vote_average) : 0} />
              <h2 className="text-lg font-semibold">{movie.description}</h2>
            </a>
          </div>
    </div>
  );
};

export default Movie;