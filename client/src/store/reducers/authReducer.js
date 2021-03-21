import {
  SET_ADMIN_USER,
  GET_ERRORS,
} from '../actions/types';

const initialSate = {
  isAdmin: false,
  validToken: false,
  error: null,
};

const authReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SET_ADMIN_USER:
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
        validToken: action.payload.validToken,
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

export default authReducer;
