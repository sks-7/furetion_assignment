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

const initialState = {
  moviedata: [],
  movieDetailsData: {},
  loading: false,
  error: false,

  token: JSON.parse(localStorage.getItem('token')) || '',
  name: JSON.parse(localStorage.getItem('name')) || '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case get_movie_loading:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case get_movie_success:
      return {
        ...state,
        loading: false,
        error: false,
        moviedata: payload,
      };

    case get_movie_error:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case get_movieDetails:
      return {
        ...state,
        loading: false,
        error: false,
        movieDetailsData: payload,
      };

    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case AUTH_LOGIN_SUCCESS: {
      localStorage.setItem('token', JSON.stringify(payload.token));
      localStorage.setItem('name', JSON.stringify(payload.name));

      return {
        ...state,
        loading: false,
        error: false,
        token: payload.token,
      };
    }

    case AUTH_LOGOUT: {
      localStorage.removeItem('token');
      localStorage.removeItem('name');

      return {
        ...state,
        loading: false,
        error: false,
        token: '',
        name: '',
      };
    }

    default:
      return state;
  }
};

export { reducer };
