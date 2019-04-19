import React from "react";
import logo from "../logo.png";

const MovieSelectOptions = ({ movies, handleMoviesChange }) => {
  return (
    <div className="flex-column">
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
      <img src={logo} alt="logo" width="200" height="150" />
    </div>
  );
};

export default MovieSelectOptions;
