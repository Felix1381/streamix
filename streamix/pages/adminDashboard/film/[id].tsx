// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
 
// const MovieDetail = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await axios.get(`/api/movies/${id}`);
//         setMovie(response.data);
//       } catch (error) {
//         console.error('Error fetching movie:', error);
//       }
//     };
//     if (id) {
//       fetchMovie();
//     }
//   }, [id]);

//   // const handleDelete = async () => {
//   //   try {
//   //     await axios.delete(`/api/movies/${id}`);
//   //     router.push('/movies'); // Redirection après suppression
//   //   } catch (error) {
//   //     console.error('Error deleting movie:', error);
//   //   }
//   // };

//   // const handleUpdate = async () => {
//   //   try {
//   //     await axios.patch(`/api/movies/${id}`, movie);
//   //     router.push('/movies'); // Redirection après mise à jour
//   //   } catch (error) {
//   //     console.error('Error updating movie:', error);
//   //   }
//   // };

//   if (!movie) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{movie.title}</h1>
//       <p>{movie.description}</p>
//       <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
//       <p>Genre: {movie.genre}</p>
//       <p>Director: {movie.director}</p>
//       <p>Ratings: {movie.ratings}</p>
//       <p>ID Film: {movie.idFilm}</p>
//       <img src={movie.image} alt={movie.title} />
//       {/* <button onClick={handleUpdate}>Update</button>
//       <button onClick={handleDelete}>Delete</button> */}
//     </div>
//   );
// };

// export default MovieDetail;
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/navabr';
import Link from 'next/link';

export default function EditUser() {
  const [erreur, setError]= useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const { title, description, releaseDate, genre, image, ratings, idFilm, director } = router.query;
  const { id } = router.query;
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: '',
    image: '',
    ratings: 0,
    comments: [],
    director: ''
  });
  useEffect(() => {
    if (id) {
      axios.get(`/api/movies/${id}`).then((res) => setMovieData(res.data));
    }
  }, [id]);

  const handleInputChange = (e: { target: { name: string; value: any; }; }) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const fieldsToUpdate: any = {};
  
      if (movieData.title !== '') fieldsToUpdate.title = movieData.title;
      if (movieData.description !== '') fieldsToUpdate.description = movieData.description;
      if (movieData.releaseDate !== '') fieldsToUpdate.releaseDate = movieData.releaseDate;
      if (movieData.genre !== '') fieldsToUpdate.genre = movieData.genre;
      if (movieData.image !== '') fieldsToUpdate.image = movieData.image;
      if (!movieData.ratings) fieldsToUpdate.ratings = movieData.ratings;
      if (movieData.comments.length == 0) fieldsToUpdate.comments = movieData.comments;
      if (movieData.director !== '') fieldsToUpdate.director = movieData.director;

  
      await axios.patch(`/api/movies/${id}`, fieldsToUpdate);
      router.push('/adminDashboard/film'); // Redirection après la création
    } catch (error) {
      console.error('Error saving movie:', error);
      setError(''+error);
      setIsLoading(false)
        }
  };

  return (
    <>
    <Navbar/>
    <section style={{minHeight:"100vh"}} className="bg-white dark:bg-gray-900 mx-auto max-h-screen-xl ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
        <Link href="/adminDashboard" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert" replace>
        <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">Edit Film</span> <span className="text-sm font-medium">Create new Film</span>
        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </Link>
        <form className="max-w-sm mx-auto" onSubmit={handleUpdate} >
        <span className="text-red-600" > {erreur} </span>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
            <input name="title" value={movieData.title}
          onChange={handleInputChange} type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="title"  />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input  name="description"
          value={movieData.description}
          onChange={handleInputChange}
          placeholder="Description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
          </div>
          <div className="mb-5">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <span className='text-green-500' >{movieData.releaseDate}</span>
            <input type="date"
          name="releaseDate"
          value={movieData.releaseDate}
          onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
          </div>
          
          <div className="mb-5">
            <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre</label>
            <input type="text"
          name="genre"
          value={movieData.genre}
          onChange={handleInputChange}
          placeholder="Genre" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
          </div>
          <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <input type="text"
          name="image"
          value={movieData.image}
          onChange={handleInputChange}
          placeholder="Image URL" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
          </div>
          <div className="mb-5">
            <label htmlFor="ratings" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
            <input  type="number"
          name="ratings"
          value={movieData.ratings}
          onChange={handleInputChange}
          placeholder="Ratings" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
          </div>
          <div className="mb-5">
            <label htmlFor="director" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Director</label>
            <input  type="text"
          name="director"
          value={movieData.director}
          onChange={handleInputChange}
          placeholder="Director" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
          </div>
          <button disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? 'Loading ...' : 'Mettre à jour'}</button>
        </form>
      </div>
    </section></>
  );
}

