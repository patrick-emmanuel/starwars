import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieSelectOptions from "./MovieSelectOptions";
import SelectedMovie from "./SelectedMovie";
import Loader from "../Loader";
import { sortFunctionAsc, baseUrl } from "../utils";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    const index = e.target.value;
    setSelectedMovie(movies[index]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/films`);
        setMovies(
          response.data.results.sort((a, b) =>
            sortFunctionAsc(a, b, "release_date")
          )
        );
        setLoading(false);
      } catch (error) {
        setErrorText(error.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (errorText) {
    return <p style={{ color: "white" }}>{errorText}</p>;
  } else {
    return (
      <div className="wrapper page">
        {movies && !loading ? (
          <MovieSelectOptions
            handleMoviesChange={handleChange}
            movies={movies}
          />
        ) : loading ? (
          <Loader />
        ) : null}
        {selectedMovie && <SelectedMovie selectedMovie={selectedMovie} />}
      </div>
    );
  }
};

export default Movies;
