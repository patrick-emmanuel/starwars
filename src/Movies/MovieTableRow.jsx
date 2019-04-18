import React from "react";
import MovieTableHeader from "./MovieTableHeader";
import MovieTableFooter from "./MovieTableFooter";
import { formatGender } from "../utils";

const MovieTableRow = ({ handleHeaderClick, characters }) => {
  return (
    <>
      <MovieTableHeader handleHeaderClick={handleHeaderClick} />
      <tbody>
        {characters.map(character => (
          <tr key={character.name}>
            <td>{character.name}</td>
            <td>{formatGender(character.gender)}</td>
            <td>{character.height}</td>
          </tr>
        ))}
      </tbody>
      <MovieTableFooter characters={characters} />
    </>
  );
};

export default MovieTableRow;
