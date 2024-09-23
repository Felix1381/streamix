import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Movie from '@/components/Movie';
import Header from '@/components/Header';
const Favoris = () => {
  const router = useRouter();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`); // Récupérer les ID des films favoris de l'utilisateur
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des favoris');
        }
        
        const data = await response.json();
        setFavoriteMovies(data.favoriteMovies); // Supposons que vous recevez un tableau d'IDs de films
      } catch (error: any) {
        setError(error); // Gestion des erreurs
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);
  
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

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className='bg-black'>
    <Header></Header>
      <h1 className='text-3xl text-bold font-mono text-center'>Mes Favoris</h1>
      {favoriteMovies.length === 0 ? (
        <p>Aucun film favori trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 outline-none">

          {favoriteMovies.map((movieId) => (
            <div key={movieId} className="shadow-2xl p-4 rounded outline-none">
              {/* Remplacez le composant Movie avec votre composant d'affichage de film */}
              <Movie movieId={movieId} />
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Favoris;