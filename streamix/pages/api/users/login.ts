// pages/api/users/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { User } from '../../../models/User'; // Assurez-vous d'importer correctement votre User
const uri = process.env.MONGODB_URI || ''; // Assurez-vous que cette variable d'environnement est correctement définie
const client = new MongoClient(uri);

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await client.connect();
      const userDocument = await User.findByEmail(client, email);
      
      if (!userDocument) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = new User(userDocument.username, userDocument.email, userDocument.password, userDocument.role='user');
      user._id = userDocument._id; // Assigner l'ID pour les opérations ultérieures
      const userId = user._id;
      const userRole = user.role;
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({ message: 'Login successful', userId, userRole });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default loginUser;