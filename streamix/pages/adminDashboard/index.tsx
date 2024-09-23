import { useState, useEffect } from "react";
import Navbar from "@/components/navabr";
import router from "next/router";

interface Movie {
  poster_path: string;
  _id: string;
  title: string;
  description: string;
  director: string;
  ratings: string;
  idFilm: string;
  image: string;
}

export default function Home() {
  const [allData, setAllData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [showAllData, setShowAllData] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzEyNzY0YThiODcwMGUzOWZhNTEwYTczZDlmNjY4MCIsIm5iZiI6MTcyNjU2MzE5MS4zMjk3ODUsInN1YiI6IjY2YzM4YTY4YTc3YzM3YjQyOGQ1Njc1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w9iI7nOLSG1jQWnuVMzLeHfGMan4xPy3b5cA3CpqwxI'
    }
  };

  const fetchAllData = async (page: number) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options);

    if (response.ok) {
      const data = await response.json();
      setAllData((prevData) => [...prevData, ...data.results]); // Ajoute les nouveaux films à la liste existante
      setShowAllData(true);
    } else {
      alert("Failed to fetch data!");
    }
  };

  // Charge les données quand `page` change
  useEffect(() => {
    fetchAllData(page);
  }, [page]);

  const handleCreateMovie = (movie: any) => {
    router.push({
      pathname: `/adminDashboard/film/new`,
      query: {
        idFilm: movie.id,
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.release_date,
        genre: movie.genre_ids.join(', '),
        image: movie.poster_path,
        ratings: movie.popularity,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        director: 'Unknown',
      },
    });
  };

  const changePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 mx-auto max-h-screen-xl">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                      <svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M19.707 9.293l-2-2-7-7a1 1 0 00-1.414 0l-7 7-2 2a1 1 0 001.414 1.414L2 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414z" />
                      </svg>
                      Home
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <a href="" className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">Film Inline</a>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">All Film</span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All Film</h2>
            </div>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {showAllData && allData.map((item) => (
              <div key={item._id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="h-56 w-full">
                  <a href="">
                    <img className="mx-auto h-full dark:hidden" src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt="" />
                    <img className="mx-auto hidden h-full dark:block" src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt="" />
                  </a>
                </div>
                <div className="pt-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">{item.ratings}</span>

                    <div className="flex items-center justify-end gap-1">
                      <button type="button" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Quick look</span>
                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z" />
                          <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        </svg>
                      </button>

                      <button type="button" className="rounded-lg p-2 text-black hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Ajouter</span>
                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{item.title}</a>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white"></p>
                    <button onClick={() => handleCreateMovie(item)} type="button" className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                      </svg>
                      Créer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full text-center">
            <button onClick={changePage} type="button" className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Show more</button>
          </div>
        </div>
      </section>
    </>
  );
}