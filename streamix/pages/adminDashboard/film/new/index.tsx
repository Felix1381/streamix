import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/navabr';
import Link from 'next/link';

const CreateMovie = () => {
  const [erreur, setError]= useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const [dg,setDg]=useState('');
  const { title, description, releaseDate, genre, image, ratings, idFilm, director,backdrop_path,vote_average,vote_count} = router.query;

  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: '',
    image: '',
    ratings: 0,
    backdrop_path:'',
    vote_average:'',
    vote_count:'',
    comments: [],
    director: dg
  });

  // useEffect(() => {
  //   fetchDirector();
  //   if (router.isReady) {
  //     setMovieData({
  //       title: typeof title === 'string' ? title : '',
  //       description: typeof description === 'string' ? description : '',
  //       releaseDate: typeof releaseDate === 'string' ? releaseDate : '',
  //       genre: Array.isArray(genre) ? genre.join(',') : typeof genre === 'string' ? decodeURIComponent(genre) : '',
  //       image: typeof image === 'string' ? image : '',
  //       ratings: typeof ratings === 'string' ? parseFloat(ratings) : 0,
  //       comments: [],
  //       backdrop_path: typeof backdrop_path === 'string' ? backdrop_path : '',
  //       vote_average: typeof vote_average === 'string' ? vote_average : '',
  //       vote_count: typeof vote_count === 'string' ? vote_count : '',
  //       director: dg
  //     });
  //   }
  // }, [router.isReady, title, description, releaseDate, genre, image, ratings, director,backdrop_path, vote_average, vote_count]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzEyNzY0YThiODcwMGUzOWZhNTEwYTczZDlmNjY4MCIsIm5iZiI6MTcyNjU2MzE5MS4zMjk3ODUsInN1YiI6IjY2YzM4YTY4YTc3YzM3YjQyOGQ1Njc1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w9iI7nOLSG1jQWnuVMzLeHfGMan4xPy3b5cA3CpqwxI'
    }
  };

  const fetchDirector = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${idFilm}/credits?api_key=c712764a8b8700e39fa510a73d9f6680`, options);
      if (response.ok) {
        const data = await response.json();
        const director = data.crew.find((member: any) => member.job === 'Director');
        if (director) {
          setDg(director.original_name); // Mise à jour du réalisateur
        }
      }
    } catch (error) {
      console.error('Error fetching director:', error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchDirector(); // Récupérer le réalisateur
    }
  }, [router.isReady, idFilm]); // Exécuter lorsqu'on a l'ID du film

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzEyNzY0YThiODcwMGUzOWZhNTEwYTczZDlmNjY4MCIsIm5iZiI6MTcyNjU2MzE5MS4zMjk3ODUsInN1YiI6IjY2YzM4YTY4YTc3YzM3YjQyOGQ1Njc1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w9iI7nOLSG1jQWnuVMzLeHfGMan4xPy3b5cA3CpqwxI'
  //   }
  // };
  // const fetchDirector = async () => {
  //     const response = await fetch(`https://api.themoviedb.org/3/movie/${idFilm}/credits?api_key=c712764a8b8700e39fa510a73d9f6680`, options);
  //     //console.log(response);
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       //console.log(data.crew);
  //       const dg = data.crew.filter(({job})=> job ==='Director'); 
  //       //console.log(dg[0].original_name);
  //       setDg(dg[0].original_name);
  //       // setAllData(data);
  //       // setShowAllData(true);
  //     } else {
  //       // alert("Failed to fetch data!");
  //     }
  // };


  // const handleInputChange = (e: { target: { name: string; value: any; }; }) => {
  //   const { name, value } = e.target;
  //   setMovieData({
  //     ...movieData,
  //     [name]: value,
  //   });
  // };

  // const handleSaveMovie = async (e: any) => {
  //   e.preventDefault()

  //   setIsLoading(true)
  //   try {
  //     await axios.post('/api/movies', { ...movieData, idFilm });
  //     router.push('/adminDashboard/film'); // Redirection après la création
  //   } catch (error) {
  //     console.error('Error saving movie:', error);
  //     setError(''+error);
  //     setIsLoading(false)
  //   }
  // };

  useEffect(() => {
    // Une fois que le réalisateur est récupéré, remplir le formulaire
    if (router.isReady && dg) {
      setMovieData({
        title: typeof title === 'string' ? title : '',
        description: typeof description === 'string' ? description : '',
        releaseDate: typeof releaseDate === 'string' ? releaseDate : '',
        genre: Array.isArray(genre) ? genre.join(', ') : typeof genre === 'string' ? decodeURIComponent(genre) : '',
        image: typeof image === 'string' ? image : '',
        ratings: typeof ratings === 'string' ? parseFloat(ratings) : 0,
        comments: [],
        backdrop_path: typeof backdrop_path === 'string' ? backdrop_path : '',
        vote_average: typeof vote_average === 'string' ? vote_average : '',
        vote_count: typeof vote_count === 'string' ? vote_count : '',
        director: dg, // Utiliser le réalisateur récupéré
      });
    }
  }, [router.isReady, dg]); // Exécuter après la récupération du réalisateur

  const handleInputChange = (e: { target: { name: string; value: any; }; }) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSaveMovie = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/movies', { ...movieData, idFilm });
      router.push('/adminDashboard/film'); // Redirection après la création
    } catch (error) {
      console.error('Error saving movie:', error);
      setError('' + error);
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <section style={{minHeight:"100vh"}} className="bg-white dark:bg-gray-900 mx-auto max-h-screen-xl ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
        <Link href="/adminDashboard" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert" replace>
        <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">Film</span> <span className="text-sm font-medium">Create new Film</span>
        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </Link>
        <form className="max-w-sm mx-auto" onSubmit={handleSaveMovie} >
        <span className="text-red-600" > {erreur} </span>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
            <input name="title" value={movieData.title}
          onChange={handleInputChange} type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="title" required readOnly/>
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input  name="description"
          value={movieData.description}
          onChange={handleInputChange}
          placeholder="Description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required readOnly/>
          </div>
          <div className="mb-5">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input type="date"
          name="releaseDate"
          value={movieData.releaseDate}
          onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required readOnly/>
          </div>
          
          <div className="mb-5">
            <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre</label>
            <input type="text"
          name="genre"
          value={movieData.genre}
          onChange={handleInputChange}
          placeholder="Genre" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required readOnly/>
          </div>
          <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <input type="text"
          name="image"
          value={movieData.image}
          onChange={handleInputChange}
          placeholder="Image URL" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required readOnly/>
          </div>
          <div className="mb-5">
            <label htmlFor="ratings" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
            <input  type="number"
          name="ratings"
          value={movieData.ratings}
          onChange={handleInputChange}
          placeholder="Ratings" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required readOnly/>
          </div>
          <div className="mb-5">
            <label htmlFor="director" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Director</label>
            <input  type="text"
          name="director"
          value={movieData.director}
          onChange={handleInputChange}
          placeholder="Director" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
          </div>
          <button disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? 'Loading ...' : 'Enregister'}</button>
        </form>
      </div>
    </section></>
  );
};

export default CreateMovie;