import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/components/navabr';
import router from 'next/router';
interface Movie {
  _id: string;
  title: string;
  description: string;
  director: string,
  ratings: string,
  idFilm: string,
  image: string,
}
const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleEdit = async (id: string) => {
    router.push(`/adminDashboard/film/${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/movies/${id}`);
      setMovies(movies.filter(movie => movie._id !== id)); // Mise à jour de l'état local après suppression
      router.push("/adminDashboard/film");
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh" }} className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 mx-auto max-h-screen-xl">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <Link href="/adminDashboard" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert" replace>
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">Film</span> <span className="text-sm font-medium">Create new Film</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </Link>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  List of Film
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">Title</th>
                    <th scope="col" className="px-4 py-3">Description</th>
                    <th scope="col" className="px-4 py-3">Image</th>

                    <th scope="col" className="px-4 py-3">Option</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id} className="border-b dark:border-gray-700">
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{movie.title}</th>
                      <td className="px-4 py-3">{movie.description}</td>
                      <td className="px-4 py-3">
                        <img className="mx-auto hidden h-full dark:block" src={"https://image.tmdb.org/t/p/w500" + movie.image} alt="" />
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleEdit(movie._id)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                        <button onClick={() => handleDelete(movie._id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                        {/* <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">See</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </section></>
  );
};

export default Movies;
