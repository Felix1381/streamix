import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/mongodb';
import { Movie } from '@/models/movies';

const editMovie = async(req: NextApiRequest, res: NextApiResponse)=> {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      const movie = await Movie.findById(client, id as string);
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movie', error });
    }
  } else if (req.method === 'PATCH') {
    try {
      await Movie.updateById(client, id as string, req.body);
      res.status(200).json({ message: 'Movie updated' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating movie', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Movie.deleteById(client, id as string);
      res.status(200).json({ message: 'Movie deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting movie', error });
    }
  }
  else   if (req.method === 'PUT') {
    try {
      const { vote } = req.body; // Assurez-vous que le corps contient un vote

      // Validation du vote
      if (typeof vote !== 'number' || vote < 1 || vote > 10) {
        return res.status(400).json({ error: 'La note doit être un nombre entre 1 et 5.' });
      }

      // Ajout du vote
      await Movie.addVote(client, id as string, vote);
      return res.status(200).json({ message: 'Vote ajouté avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movie', error });
    }
  }
  else {
    res.setHeader('Allow', ['PATCH', 'DELETE', 'GET', 'PUT']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

export default editMovie;
