// pages/api/movies.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { Movie } from '../../../models/movies'; // Ajustez le chemin en fonction de votre structure de dossier

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  await client.connect();

  if (req.method === 'GET') {
    try {
      const movies = await Movie.findAll(client);
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movies', error: error });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}