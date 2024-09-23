// pages/api/users/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { User } from '../../../models/User';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, email, password, role } = req.body;

    try {
      await client.connect();

      // Vérifie si l'email est déjà utilisé
      const existingUser = await User.findByEmail(client, email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      const newUser = new User(username, email, password,role);
      await newUser.save(client);

      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  }
  if (req.method === 'GET') {
    try {
      await client.connect();

      // Vérifie si l'email est déjà utilisé
      const user = await User.findall(client);

      return res.status(201).json({ message: 'Utilisateur recupéré', user: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
};

export default createUser;