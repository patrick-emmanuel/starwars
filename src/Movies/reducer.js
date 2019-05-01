import { actions } from "./actions";

export const movieReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_MOVIES:
      return { ...state, movies: action.payload, loading: false };
    case actions.SELECTED_MOVIE:
      return { ...state, selectedMovie: action.payload, loading: false };
    case actions.MOVIE_LOADING:
      return { ...state, movieLoading: action.payload };
    case actions.MOVIE_ERROR:
      return { ...state, movieError: action.payload };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};
