import React from "react";
import { useSpring, animated } from "react-spring";
import logo from "../logo.png";

const MovieSelectOptions = ({ movies, handleMoviesChange }) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <animated.div style={props} className="flex-column">
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
    </animated.div>
  );
};

export default MovieSelectOptions;
