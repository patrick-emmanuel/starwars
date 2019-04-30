import React, { useContext, useReducer, useMemo, createContext } from "react";
import { movieReducer } from "./reducer";
import { actions } from "./actions";

const MovieContext = createContext();

const defaultState = {
  movies: [],
  selectedMovie: null,
  movieLoading: false,
  movieError: ""
};

const MovieProvider = props => {
  const [state, dispatch] = useReducer(movieReducer, defaultState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <MovieContext.Provider value={value} {...props} />;
};

export const useMovieState = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error(`useMovieState must be a child of MovieProvider`);
  }
  const [state, dispatch] = context;
  const setMovies = payload => dispatch({ type: actions.MOVIE, payload });
  const setSelectedMovie = payload => {
    dispatch({ type: actions.SELECTED_MOVIE, payload });
  };
  const setMovieLoading = payload => {
    dispatch({ type: actions.MOVIE_LOADING, payload });
  };
  const setMovieError = payload => {
    dispatch({ type: actions.MOVIE_ERROR, payload });
  };

  return {
    state,
    setMovieLoading,
    setMovieError,
    setMovies,
    setSelectedMovie
  };
};

export default MovieProvider;
