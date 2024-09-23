import React, { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import Modal from '../components/Modal';
import { fetchMovie } from '../utils/fetchMovies';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

const MoviesPage: React.FC = () => {
  const router = useRouter();
  
  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      router.push('/login');
    }
  }, [router]);

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseUrl = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error('Échec de la récupération des films');
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur inattendue s\'est produite');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = async (id: number) => {
    const movieToShow = movies.find(movie => movie.idFilm === id);
    setSelectedMovie(movieToShow);
    try {
      const movieData = await fetchMovie(movieToShow);
      if (movieData.videos.results.length > 0) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${movieData.videos.results[0].key}`);
      }
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setTrailerUrl(null); // Réinitialiser l'URL de la bande-annonce
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    ); // Affiche un loader pendant le chargement des données
  }
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className='bg-black text-white'>
      <Header></Header>
      <h1 className='text-3xl text-center font-mono'>Tous nos Films</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 outline-none">
        {movies.map((movie) => (
          <div key={movie.idFilm} className="shadow-2xl p-4 rounded outline-none">
            <a onClick={() => handleMovieClick(movie.idFilm)} style={{ cursor: 'pointer' }}>
              <img
                src={baseUrl + movie.image}
                alt={movie.title}
                className="w-full h-auto rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <StarRating rating={movie.vote_average ? parseFloat(movie.vote_average) : 0} />
            </a>
          </div>
        ))}
      </div>

      {/* Modal pour afficher les détails du film */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        movie={selectedMovie}
        trailerUrl={trailerUrl} // Passer l'URL de la bande-annonce
      />
    </div>
  );
};

export default MoviesPage;