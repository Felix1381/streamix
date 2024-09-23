import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = client.db('streamix');

  const totalMovies = await db.collection('movies').countDocuments();
  const averageRating = await db.collection('movies').aggregate([{ $group: { _id: null, averageRating: { $avg: "$ratings" } } }]).toArray();
  const highestVoteCount = await db.collection('movies').aggregate([
    { $sort: { vote_count: -1 } },  // Trier par "vote_count" décroissant
    { $limit: 1 },                  // Limiter à 1 document
    { $project: { _id: 0, vote_count: 1 } }  // Projeter uniquement "vote_count"
  ]).toArray();
  const genreStats = await db.collection('movies').aggregate([{ $unwind: "$genre" }, { $group: { _id: "$genre", count: { $sum: 1 } } }]).toArray();
  const ratingDistribution = await db.collection('movies').aggregate([{ $bucket: { groupBy: "$ratings", boundaries: [0, 1, 2, 3, 4, 5], default: "Autres" } }]).toArray();
  const totalUsers = await db.collection('users').countDocuments();
  const adminCount = await db.collection('users').countDocuments({ role: "admin" });
  const recentMovies = await db.collection('movies').find().sort({ dateAdded: -1 }).limit(5).toArray();

  res.status(200).json({
    totalMovies,
    averageRating: averageRating[0]?.averageRating || 0,
    movieWithMostVotes : highestVoteCount.length > 0 ? highestVoteCount[0].vote_count : null,
    genreStats,
    ratingDistribution,
    totalUsers,
    adminCount,
    recentMovies,
  });
}