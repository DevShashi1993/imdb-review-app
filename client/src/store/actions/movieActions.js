import axios from 'axios';
import { GET_ALL_MOVIE, SEARCH_MOVIE, GET_ERRORS } from './types';

export const getAllMovieData = () => async dispatch => {
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

      dispatch({
        type: GET_ALL_MOVIE,
        payload: newMovieData,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const searchMovieData = searchStr => async dispatch => {
  let newMovieData = [];
  try {
    const res = await axios.get(`/movie/search`, {
      params: {
        keyword: searchStr,
      },
    });

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

      dispatch({
        type: SEARCH_MOVIE,
        payload: newMovieData,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
