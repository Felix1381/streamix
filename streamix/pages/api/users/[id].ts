import { MongoClient, ObjectId } from 'mongodb';
import client from '@/lib/mongodb';
import { User } from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { username, email, password, role } = req.body;

    try {
      // Mise à jour partielle de l'utilisateur
      await User.update(client, id as string, { username, email, password, role });
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const db = client.db('streamix');
      await db.collection('users').deleteOne({ _id: new ObjectId(id as string) });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  } else if (req.method === 'GET') {
    try {
      await client.connect();
      const user = await client.db('streamix').collection('users').findOne({ _id: new ObjectId(id as string) });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  } 
  else if (req.method === 'PUT') {
    try {
      await client.connect()
        const { movieId } = req.body; // ID du film à ajouter aux favoris
        console.log(movieId);
        // Validation de l'ID du film
        if (!movieId) {
          return res.status(400).json({ error: 'L\'ID du film est requis.' });
        }
  
        // Ajout du film aux favoris
        await User.addFavoriteMovie(client, id as string, movieId);
        // console.log(adding);
        return res.status(200).json({ message: 'Film ajouté aux favoris avec succès.' });
    }
    catch (error) {
      // console.log(error);
      res.status(500).json({ message: 'Error adding favourite movie for user', error });
    }
  }
  else {
    // Si la méthode n'est ni PATCH, DELETE, ni GET, retourner un code d'erreur 405
    res.setHeader('Allow', ['PATCH', 'DELETE', 'GET', 'PUT']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}