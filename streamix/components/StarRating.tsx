// components/StarRating.tsx
import React from 'react';

interface StarRatingProps {
  rating: number; // Note entre 0 et 10
  totalStars?: number; // Par défaut, nous allons afficher 5 étoiles
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  const stars = Array.from({ length: totalStars }, (v, i) => (
    <span key={i} className="text-yellow-500">
      {i < rating / 2 ? '★' : '☆'}
    </span>
  ));

  return <div>{stars}</div>;
};

export default StarRating;