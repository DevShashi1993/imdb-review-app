import axios from 'axios';

export const getAllMovieData = async () => {
  let newMovieData = [];
  try {
    const res = await axios.get('/movie/all');

    if (res.status === 200) {
      newMovieData = await res.data;

      newMovieData = newMovieData.map(obj => {
        let { id, name, director, imdb_score, popularity, genres } = obj;
        genres = genres && genres.length > 0 ? genres.split(',') : [];
        return {
          id: id,
          movie_name: name,
          director_name: director,
          rating: imdb_score,
          popularity: popularity,
          genre: genres,
        };
      });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
  return newMovieData;
};

export const addNewMovieData = async movieData => {
  console.log('addNewMovieData called with movie id', movieData);
  // try {
  //   const res = await axios.post('/movie/new', movieData);
  //   let newMovieData = null;
  //   if (res.status === 200) {
  //     let newMovieData = await res.data;
  //     // console.log('newMovieData => ', newMovieData);
  //   }
  // } catch (error) {
  //   console.log(`Error: ${error}`);
  // }
};

export const updateMovieData = async movie_id => {
  console.log('updateMovieData called with movie id', movie_id);
  // try {
  //   const res = await axios.put('/movie', { id: movie_id });
  //   let newMovieData = null;
  //   if (res.status === 200) {
  //     let newMovieData = await res.data;
  //     // console.log('newMovieData => ', newMovieData);
  //   }
  // } catch (error) {
  //   console.log(`Error: ${error}`);
  // }
};
