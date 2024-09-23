// pages/api/users/addFavourite.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { User } from '../../../models/User';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

const addFavourite = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, favouriteId } = req.body;

    try {
      await client.connect();

      // Récupération de l'utilisateur par son ID
      const userDocument = await User.findByEmail(client, userId);
      if (!userDocument) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = new User(userDocument.username, userDocument.email, userDocument.password,userDocument.role);
      user._id = userDocument._id; // Assigne l'ID pour les opérations ultérieures

      await user.addFavourite(client, favouriteId);

      return res.status(200).json({ message: 'Favourite added successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default addFavourite;