import {
  GET_ALL_MOVIE,
  SEARCH_MOVIE,
  GROUP_BY_GENRE,
  ADD_MOVIE,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  GET_ERRORS,
} from '../actions/types';

const initialSate = {
  movieData: [],
  isLoading: true,
  error: null,
};

const ticketReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_ALL_MOVIE:
      return {
        ...state,
        isLoading: false,
        movieData: action.payload,
      };
    case SEARCH_MOVIE:
      return {
        ...state,
        isLoading: false,
        movieData: action.payload,
      };
    case GROUP_BY_GENRE:
      return {
        ...state,
        isLoading: false,
        movieData: action.payload,
      };

    case ADD_MOVIE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_MOVIE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ticketReducer;
