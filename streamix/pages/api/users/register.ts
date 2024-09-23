// pages/api/users/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { User } from '../../../models/User';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    const role="user";

    try {
      await client.connect();

      // Vérifie si l'email est déjà utilisé
      const existingUser = await User.findByEmail(client, email);
      if (existingUser) {
        return res.status(409).json({ message: 'Cet Email est déjà utilisé' });
      }

      const newUser = new User(username, email, password,role);
      await newUser.save(client);

      return res.status(201).json({ message: 'Utilisateur enrégistré avec succès', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur de serveur interne' });
    } finally {
      await client.close();
    }
  }

  return res.status(405).json({ message: 'Methode non autorisée' });
};

export default registerUser;