// utils/fetchMovie.ts

export const fetchMovie = async (movie: { idFilm: number; media_type: string }) => {
    try {
        //console.log("fetchMovie ID",movie.idFilm);
      const response = await fetch(
        `https://api.themoviedb.org/3/${
          movie.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie.idFilm}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      );
  
      if (!response.ok) {
        throw new Error(`Échec de la récupération des données du film (${response.status})`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du film:', error);
      throw new Error('Erreur lors de la récupération du film');
    }
  };