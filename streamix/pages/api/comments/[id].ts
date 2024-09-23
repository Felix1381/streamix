import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { Movie } from '@/models/movies'; // Assurez-vous que le chemin est correct

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query; // ID du film fourni dans l'URL

  try {
    await client.connect();

    switch (method) {
      case 'GET':
        const movie = await Movie.findById(client, id as string);
        if (!movie) {
          return res.status(404).json({ message: 'Film non trouvé' });
        }
        // Extraire les commentaires
        const comments = movie.comments || {}; // Gestion au cas où il n'y aurait pas de commentaires
        return res.status(200).json(comments); // Retourne les commentaires

      case 'POST':
        // Logique pour ajouter un commentaire si nécessaire
        break;

      default:
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur lors de la manipulation des films :', error);
    return res.status(500).json({ message: 'Erreur lors de la manipulation des films' });
  } finally {
    await client.close();
  }
}