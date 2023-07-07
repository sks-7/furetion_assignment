import {
  get_movie_loading,
  get_movie_success,
  get_movie_error,
  get_movieDetails,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
} from './actionTypes';

import axios from 'axios';

export const getMovie = () => async (dispatch) => {
  dispatch({ type: get_movie_loading });
  try {
    let res = await axios.get('https://furetion.onrender.com/api/tickets');
    dispatch({ type: get_movie_success, payload: res.data });
  } catch (e) {
    dispatch({ type: get_movie_error });
  }
};

export const getMovieDetails = (id) => async (dispatch) => {
  try {
    let res = await axios.get(
      `https://furetion.onrender.com/api/tickets/${id}`
    );

    dispatch({ type: get_movieDetails, payload: res.data });
  } catch (e) {
    console.log('something is wrong', e);
  }
};

// actions for making login

export const loginAPI = (creds, toast, navigate) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_LOADING });
  try {
    let response = await axios.post('http://localhost:8080/user/login', creds);
   
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data });

    toast({
      title: 'Login Successfull',
      status: 'Success',
      duration: 9000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate('/home');
      window.location.reload();
    }, 100);

    return response.data;
  } catch (e) {
    dispatch({ type: AUTH_LOGIN_ERROR });

    toast({
      title: 'Login Failed',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }
};

export const Signout = () => ({ type: AUTH_LOGOUT });
