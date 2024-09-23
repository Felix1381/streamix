interface MovieStats {
    totalMovies: number;
    averageRating: number;
    movieWithMostVotes: number;
    genreStats: { _id: string; count: number }[];
    ratingDistribution: { _id: number; count: number }[];
    totalUsers: number;
    adminCount: number;
    recentMovies: { _id: string; title: string }[];
  }
  import { useEffect, useState } from 'react';
  import axios from 'axios';
import Navbar from '@/components/navabr';
  
  export default function AdminStats() {
    const [stats, setStats] = useState<MovieStats>({
      totalMovies: 0,
      averageRating: 0,
      movieWithMostVotes:0,
      genreStats: [],
      ratingDistribution: [],
      totalUsers: 0,
      adminCount: 0,
      recentMovies: [],
    });
  
    useEffect(() => {
      async function fetchStats() {
        const res = await axios.get('/api/statistic/stats');
        console.log(res.data);
        
        setStats(res.data);
      }
      fetchStats();
    }, []);
  
    return (
        <><Navbar />
         <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Statistiques</h1>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        {/* Nombre total de films */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Nombre total de films</h2>
          <p className="text-2xl text-gray-900 dark:text-white mt-2">{stats.totalMovies}</p>
        </div>

        {/* Note moyenne des films */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Note moyenne des films</h2>
          <p className="text-2xl text-gray-900 dark:text-white mt-2">{stats.averageRating.toFixed(1)}</p>
        </div>

        {/* Nombre total d'utilisateurs */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Nombre total d'utilisateurs</h2>
          <p className="text-2xl text-gray-900 dark:text-white mt-2">{stats.totalUsers}</p>
        </div>

        {/* Nombre total d'administrateurs */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Nombre total d'administrateurs</h2>
          <p className="text-2xl text-gray-900 dark:text-white mt-2">{stats.adminCount} </p>
        </div>

        {/* Top 5 des films les plus commentés */}
        {/* <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Top 5 des films les plus commentés</h2>
          <ul className="mt-3 space-y-2">
            {stats.topMovies.map((movie) => (
              <li key={movie._id} className="text-gray-600 dark:text-gray-400">
                {movie.title} - {movie.commentsCount} commentaires
              </li>
            ))}
          </ul>
        </div> */}

        {/* Distribution des genres */}
        {/* <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Distribution des genres</h2>
          <ul className="mt-3 space-y-2">
            {stats.genreStats.map((genre) => (
              <li key={genre._id} className="text-gray-600 dark:text-gray-400">
                {genre._id}: {genre.count}
              </li>
            ))}
          </ul>
        </div> */}

        {/* Distribution des notes */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Distribution des notes</h2>
          <ul className="mt-3 space-y-2">
          {stats.movieWithMostVotes}
          </ul>
        </div>

        {/* Films récents */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Films récents</h2>
          <ul className="mt-3 space-y-2">
            {stats.recentMovies.map((movie) => (
              <li key={movie._id} className="text-gray-600 dark:text-gray-400">
                {movie.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
        </>
    );
  }
  