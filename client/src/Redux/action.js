import {
  get_movie_loading,
  get_movie_success,
  get_movie_error,
  get_movieDetails,
} from './actionTypes';

import axios from 'axios';

export const getMovie = () => async (dispatch) => {
  dispatch({ type: get_movie_loading });
  try {
    let res = await axios.get('http://localhost:8080/api/tickets');
    dispatch({ type: get_movie_success, payload: res.data });
  } catch (e) {
    dispatch({ type: get_movie_error });
  }
};

export const getMovieDetails = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`http://localhost:8080/api/tickets/${id}`);

    dispatch({ type: get_movieDetails, payload: res.data });
  } catch (e) {
    console.log('something is wrong', e);
  }
};
