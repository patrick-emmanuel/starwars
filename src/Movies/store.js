import React, { useContext, useReducer, useMemo, createContext } from "react";
import { movieReducer } from "./reducer";

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

  return {
    state,
    dispatch
  };
};

export default MovieProvider;
