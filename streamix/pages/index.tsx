import { GetServerSideProps } from "next";
import clientPromise from '../lib/mongodb';
//import Header from "@/components/Header";

type Movie = {
  _id: string;
  title: string;
  image: string;
  description: string;
};

type Props = {
  movies: Movie[];
};

const Home = ({ movies }: Props) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
    <header className="flex justify-between items-center p-4 bg-gradient-to-b from-black to-transparent fixed top-0  w-full z-10">
    <img src="/streamix.png" alt="logo" className="h-8" />
    <nav>
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:text-gray-400">
            Accueil
          </a>
        </li>
        <li>
          <a href="/films" className="hover:text-gray-400">
            Films
          </a>
        </li>
        <li>
          <a href="/login" className="hover:text-gray-400 connexion-nav">
          Connexion
          </a>
        </li>
      </ul>
    </nav>
  </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full">
              <div className="h-30 w-full overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-x1 font-bold mb-2">{movie.title}</h2>
                <p className="text-grap-400 mb-4">
                  {movie.description ? `${movie.description.substring(0, 100)}...`: "No description available"}
                </p>
                <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">
                  Watch now
                </button>
              </div>
              
              
            </div>
          ))}
        </div>
      </main>

      <br/>
      <footer className="bg-black bg-opacity-50 p-4 text-center">
        <p>© {new Date().getFullYear()} streamix. All rights reserved.</p>
      </footer>

    </div>
    
  );
};

<div className="bg-black bg-opacity-50 p-4 text-center">
  <p><p>© {new Date().getFullYear()} streamix. All rights reserved.</p></p>
</div>

export const getServerSideProps: GetServerSideProps = async () => {
  const client = await clientPromise;
  const db = client.db('streamix');

  // Récupérer 15 films depuis la collection 'movies'
  const movies = await db
    .collection('movies')
    .find({})
    .limit(16)
    .toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
};



export default Home;

<div className="bg-black bg-opacity-50 p-4 text-center">
  <p><p>© {new Date().getFullYear()} streamix. All rights reserved.</p></p>
</div>