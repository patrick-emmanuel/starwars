import { useContext } from "react";
import AppContext from "./index";

export const actions = {
  ALL_CHARACTERS: "ALL_CHARACTERS",
  CHARACTERS: "CHARACTERS",
  SORT_ASC: "SORT_ASC",
  MOVIE_LOADING: "MOVIE_LOADING",
  MOVIE_ERROR: "MOVIE_ERROR",
  CHARACTERS_LOADING: "CHARACTERS_LOADING",
  CHARACTERS_ERROR: "CHARACTERS_ERROR",
  MOVIE: "MOVIE",
  SELECTED_MOVIE: "SELECTED_MOVIE"
};

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`useAppState must be a child of AppProvider`);
  }
  const [state, dispatch] = context;
  const setAllCharacters = payload => {
    dispatch({ type: actions.ALL_CHARACTERS, payload });
  };
  const setCharacters = payload => {
    dispatch({ type: actions.CHARACTERS, payload });
  };
  const setSortAscending = () => dispatch({ type: actions.SORT_ASC });
  const setMovies = payload => dispatch({ type: actions.MOVIE, payload });
  const setSelectedMovie = payload => {
    dispatch({ type: actions.SELECTED_MOVIE, payload });
  };
  const setCharactersLoading = payload => {
    dispatch({ type: actions.CHARACTERS_LOADING, payload });
  };
  const setMovieLoading = payload => {
    dispatch({ type: actions.MOVIE_LOADING, payload });
  };
  const setCharactersError = payload => {
    dispatch({ type: actions.CHARACTERS_ERROR, payload });
  };
  const setMovieError = payload => {
    dispatch({ type: actions.MOVIE_ERROR, payload });
  };

  return {
    state,
    setAllCharacters,
    setCharacters,
    setSortAscending,
    setCharactersLoading,
    setMovieLoading,
    setCharactersError,
    setMovieError,
    setMovies,
    setSelectedMovie
  };
}
