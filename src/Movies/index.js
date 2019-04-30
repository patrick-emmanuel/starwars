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

const Movies = () => {
  const {
    state,
    setMovies,
    setSelectedMovie,
    setMovieLoading,
    setMovieError
  } = useMovieState();

  const { movieLoading, movieError, movies, selectedMovie } = state;

  const handleChange = e => {
    e.preventDefault();
    const index = e.target.value;
    setSelectedMovie(movies[index]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const key = "movies";
      const cachedMovies = retrieveCacheValues(key);
      if (cachedMovies) {
        setMovies(cachedMovies);
        return;
      }
      let movies = [];
      try {
        setMovieLoading(true);
        setMovieError("");
        const response = await axios.get(`${baseUrl}/films`);
        movies = response.data.results.sort((a, b) =>
          sortFunctionAsc(a, b, "release_date")
        );
        setMovieLoading(false);
      } catch (error) {
        setMovieError(error.message);
        setMovieLoading(false);
      }
      cacheValues(key, movies);
      setMovies(movies);
    };
    fetchMovies();
  }, []);

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
