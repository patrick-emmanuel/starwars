import React, { useEffect } from "react";
import axios from "axios";
import MovieSelectOptions from "./MovieSelectOptions";
import SelectedMovie from "./SelectedMovie";
import Loader from "../Loader";
import {
  sortFunctionAsc,
  baseUrl,
  retrieveCacheValues,
  cacheValues
} from "../utils";
import { useMovieState } from "./store";
import { actions } from "./actions";

const Movies = () => {
  const { state, dispatch } = useMovieState();
  const { movieLoading, movieError, movies, selectedMovie } = state;

  const handleChange = e => {
    e.preventDefault();
    const index = e.target.value;
    dispatch({ type: actions.SELECTED_MOVIE, payload: movies[index] });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const key = "movies";
      const cachedMovies = retrieveCacheValues(key);
      if (cachedMovies) {
        dispatch({ type: actions.SET_MOVIES, payload: cachedMovies });
        return;
      }
      let movies = [];
      try {
        dispatch({ type: actions.MOVIE_LOADING, payload: true });
        dispatch({ type: actions.MOVIE_ERROR, payload: "" });
        const response = await axios.get(`${baseUrl}/films`);
        movies = response.data.results.sort((a, b) =>
          sortFunctionAsc(a, b, "release_date")
        );
        dispatch({ type: actions.MOVIE_LOADING, payload: false });
      } catch (error) {
        dispatch({ type: actions.MOVIE_ERROR, payload: error.message });
        dispatch({ type: actions.LOADING, payload: false });
      }
      cacheValues(key, movies);
      dispatch({ type: actions.SET_MOVIES, payload: movies });
    };
    fetchMovies();
  }, [dispatch]);

  if (movieError) {
    return <p style={{ color: "white" }}>{movieError}</p>;
  } else {
    return (
      <div className="wrapper page">
        {movies && !movieLoading ? (
          <MovieSelectOptions
            handleMoviesChange={handleChange}
            movies={movies}
          />
        ) : movieLoading ? (
          <Loader />
        ) : null}
        {selectedMovie && <SelectedMovie selectedMovie={selectedMovie} />}
      </div>
    );
  }
};

export default Movies;
