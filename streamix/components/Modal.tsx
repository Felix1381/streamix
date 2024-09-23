import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { IMovie } from '@/models/movies';
import StarRating from './StarRating';
import { useRouter } from 'next/router';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: IMovie | null; 
  trailerUrl: string | null; 
}

const Star: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => {
  return (
    <span onClick={onClick} style={{ cursor: 'pointer' }}>
      {filled ? '★' : '☆'} {/* Utilisation d'étoiles simples ici, peut être changé par des éléments SVG */}
    </span>
  );
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, movie, trailerUrl }) => {
  if (!isOpen) return null;

  const [newComment, setNewComment] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [comments, setComments] = useState<string[]>([]); 
  const [vote, setVote] = useState<number | null>(null); // État pour le vote
  const [voteError, setVoteError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const router = useRouter();
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchComments = async () => {
      if (movie) {
        try {
          const response = await fetch(`/api/comments/${movie._id}`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des commentaires');
          }
          const fetchedComments: { [userId: string]: string[] } = await response.json();
          const allComments = Object.values(fetchedComments).flat() as string[];  
          setComments(allComments);
        } catch (error) {
          console.error('Erreur de récupération des commentaires :', error);
          setErrorMessage('Erreur lors de la récupération des commentaires. Veuillez réessayer.');
        }
      }
    };
    
    fetchComments();
  }, [movie]);

  const handleSubmitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newComment.trim()) {
      try {
        const userId = localStorage.getItem('userId'); 
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            movieId: movie?._id,
            commentText: newComment,
            userId,
          }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du commentaire');
        }

        setNewComment('');
        setErrorMessage('');
        const id = movie?._id;
        const fetchedComments = await fetch(`/api/comments/${id}`);
        const newComments: { [userId: string]: string[] } = await fetchedComments.json();
        const allComments = Object.values(newComments).flat() as string[]; 
        setComments(allComments);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        setErrorMessage('Erreur lors de l\'ajout du commentaire. Veuillez réessayer.');
      }
    } else {
      setErrorMessage('Le commentaire ne peut pas être vide.');
    }
  };

  const handleVoteSubmit = async () => {
    if (vote === null) {
      setVoteError('Veuillez sélectionner un grade entre 1 et 5 étoiles.');
      return;
    }

    try {
      const response = await fetch(`/api/movies/${movie?._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du vote.');
      }

      // Réinitialiser la note après le vote
      setVote(null);
      setVoteError('');
    } catch (error) {
      console.error('Erreur lors du vote:', error);
      setVoteError('Erreur lors de votre vote. Veuillez réessayer.');
    }
  };


  const handleAddToFavorites = async () => {
    setError(''); // Réinitialiser l'erreur

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId: movie?._id }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400) {
          setError(data.error); // Erreur spécifique
        } else {
          throw new Error('Erreur lors de l\'ajout aux favoris');
        }
      } else {
        setAddedToFavorites(true); // Film ajouté avec succès
      }
    } catch (error) {
      setError('Ce film est déjà ajouté. Veuillez réessayer avec un autre.');
      console.error(error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white bg-black overflow-y-scroll">
      <div className="bg-black opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-black rounded-lg p-5 z-10 relative max-w-3xl w-full h-auto  mt-20">
        <h2 className="text-2xl font-bold">{movie?.title}</h2>
        <p>{movie?.description}</p>
        {trailerUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Bande-annonce :</h3>
            <ReactPlayer url={trailerUrl} controls width="100%" height={500} />
          </div>
        )}
        
        {/* Section pour le vote sous forme d'étoiles */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Donnez votre note :</h3>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                filled={vote !== null && star <= vote}
                onClick={() => setVote(star)} 
              />
            ))}
            
          </div>
          {voteError && <div className="text-red-500">{voteError}</div>}
          <button onClick={handleVoteSubmit} className="mt-2 bg-blue-500 text-white p-2 rounded">
            Voter
          </button>
          <StarRating rating={movie?.vote_average ? (movie?.vote_average) : 0} />
          <p>Nombre Total de votes: {movie?.vote_count}   || Moyenne de votes :  {movie?.vote_average}</p>
        </div>

        {/* Section pour les commentaires */}
        <h3 className="text-lg font-semibold mt-4">Commentaires :</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <p>{comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun commentaire disponible.</p>
        )}
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Ajouter un commentaire"
            className="border p-2 w-full text-black"
          />
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
            Ajouter
          </button>
        </form>
        <div className='flex justify-between gap-6'>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white p-2 rounded text-center w-full">
          Fermer
        </button>
        <button onClick={handleAddToFavorites} disabled={isLoading} className="mt-4 bg-green-500 text-white p-2 rounded text-center w-full">
        {isLoading ? 'Ajout en cours...' : 'Ajouter aux Favoris'}
        </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Modal;