import Navbar from "@/components/navabr";

export default async function Home() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzEyNzY0YThiODcwMGUzOWZhNTEwYTczZDlmNjY4MCIsIm5iZiI6MTcyNjU2MzE5MS4zMjk3ODUsInN1YiI6IjY2YzM4YTY4YTc3YzM3YjQyOGQ1Njc1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w9iI7nOLSG1jQWnuVMzLeHfGMan4xPy3b5cA3CpqwxI'
    }
  };
  const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)
  const posts = await data.json()
  //console.log(posts.results);
  
  return (
    <>
    <Navbar/>
    <h1>Account Base Page All Acount{postId}</h1>
    </>
  )
}