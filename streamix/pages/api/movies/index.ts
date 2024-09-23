import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/mongodb';
import { Movie } from '@/models/movies';
// Route pour créer un film
const createMovie = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, description, releaseDate, genre, director, ratings, idFilm, image,backdrop_path, vote_average, vote_count } = req.body;
    const genresArray = genre.split(',').map((g: string) => g.trim());  // Conversion en tableau

    try {
      const newMovie = new Movie(
        title,
        description,
        new Date(releaseDate),
        genresArray,
        director,
        ratings,
        idFilm,
        image,
        backdrop_path,
        vote_average,
        vote_count,
        new Date(),
      );
      await newMovie.save(client);
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ message: 'Error saving movie', error });
    }
  }

  if (req.method === 'GET') {
    try {
      const movies = await Movie.findAll(client);
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movies', error });
    }
  }
}

export default createMovie;
