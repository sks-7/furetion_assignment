import {
  get_movie_loading,
  get_movie_success,
  get_movie_error,
  get_movieDetails,
} from './actionTypes';

const initialState = {
  moviedata: [],
  movieDetailsData: {},

  loading: false,

  error: false,
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

    default:
      return state;
  }
};

export { reducer };
