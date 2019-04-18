import React from "react";

const MovieSelectOptions = ({ movies, handleMoviesChange }) => {
  return (
    <select defaultValue="" onChange={handleMoviesChange}>
      <option value="" disabled>
        Select a movie
      </option>
      {movies.map((movie, index) => (
        <option key={movie.title} value={index}>
          {movie.title}
        </option>
      ))}
    </select>
  );
};

export default MovieSelectOptions;
