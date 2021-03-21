import axios from 'axios';
import { SET_ADMIN_USER, GET_ERRORS } from './types';

export const authAdminLogin = authCredentials => async dispatch => {
  try {
    const res = await axios.post('/admin/login', authCredentials);
    let isAdmin = false;
    let validToken = false;
    
    dispatch({
      type: SET_ADMIN_USER,
      payload: { isAdmin, validToken },
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
