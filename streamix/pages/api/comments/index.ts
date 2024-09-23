import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

// Assurez-vous que ceci est bien configuré dans votre connnexion à la base de données.
let client: MongoClient;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
  }
  return client.db();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { movieId, commentText, userId } = req.body;
    //console.log(userId);
    //console.log(movieId);
    //console.log(commentText);

    if (!movieId || !commentText || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const db = await connectToDatabase();

      // Vérifiez si le film existe
      const movieDoc = await db.collection('movies').findOne({ _id: new ObjectId(movieId) });

      if (!movieDoc) {
        return res.status(404).json({ message: `Movie with id ${movieId} not found` });
      }

      // Préparer le nouvel objet comments
      const updatedComments = { ...movieDoc.comments };

      // Si l'utilisateur n'a pas encore de commentaires, créez un tableau vide
      if (!updatedComments[userId]) {
        updatedComments[userId] = [];
      }
      
      // Ajouter le nouveau commentaire au tableau de l'utilisateur
      updatedComments[userId].push(commentText);

      // Mettre à jour le document en base de données
      await db.collection('movies').updateOne(
        { _id: new ObjectId(movieId) },
        {
          $set: { comments: updatedComments }
        }
      );

      return res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}