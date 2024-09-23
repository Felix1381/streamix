// lib/session.ts
import session from 'next-session';
import { NextApiRequest, NextApiResponse } from 'next';

const sessionOptions = {
  name: 'sessionId', // Nom du cookie de session
  secure: process.env.NODE_ENV === 'production', // Utilisez HTTPS en production
  maxAge: 30 * 60, // Durée de vie de la session (en secondes)
  sameSite: 'lax', // Stratégie de même site
};

export const withSession = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await session(sessionOptions)(req, res);
    return handler(req, res);
  };
};