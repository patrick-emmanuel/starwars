import React from "react";
import { useSpring, animated } from "react-spring";
import CharacterTableRow from "./CharacterTableRow";
import Loader from "../Loader";
import useFetchMovieCharacters from "./customHooks";

const CharactersTable = ({ movie }) => {
  const {
    charactersLoading,
    charactersError,
    characters,
    handleHeaderClick,
    handleGenderFilterClick
  } = useFetchMovieCharacters(movie);
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  if (charactersError) {
    return <p>{charactersError}</p>;
  } else if (charactersLoading) {
    return <Loader />;
  } else if (!charactersLoading && characters.length > 0) {
    return (
      <animated.section style={props} className="wrapper">
        <div className="wrapper">
          <select onClick={handleGenderFilterClick}>
            <option value="all">All</option>
            <option value="male">M</option>
            <option value="female">F</option>
          </select>
          <table>
            <CharacterTableRow
              characters={characters}
              handleHeaderClick={handleHeaderClick}
              handleGenderFilterClick={handleGenderFilterClick}
            />
          </table>
        </div>
      </animated.section>
    );
  } else {
    return null;
  }
};

export default CharactersTable;
