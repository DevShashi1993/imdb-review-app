import axios from 'axios';
import {
  GET_ALL_MOVIE,
  SEARCH_MOVIE,
  GROUP_BY_GENRE,
  SORT_BY,
  GET_ERRORS,
} from './types';

export const getAllMovieData = (page) => async (dispatch, getState) => {
  let newMovieData = [];
  const prevMovieData = getState().movieState.movieData;
  
  try {
    const res = await axios.get('/movie/all', {
      params: {
        offSet: page * 10,
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

      newMovieData = [...prevMovieData, ...newMovieData];

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
  if (!searchStr) {
    dispatch(getAllMovieData());
  } else {
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
  }
};

export const sortBy = sortByObj => async dispatch => {
  // console.log(sortByObj);
  let newMovieData = [];
  try {
    const res = await axios.get(`/movie/sortby`, {
      params: sortByObj,
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
        type: SORT_BY,
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

export const groupByGenre = grpByGenreArr => async dispatch => {
  // console.log(grpByGenreArr);
  let newMovieData = [];
  try {
    const res = await axios.get(`/movie/groupbygenre`, {
      params: {
        genre: grpByGenreArr.reduce((acc, curr) => `${acc},${curr}`),
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
        type: GROUP_BY_GENRE,
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
