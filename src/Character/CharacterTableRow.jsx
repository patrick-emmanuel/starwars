import React from "react";
import CharacterTableHeader from "./CharacterTableHeader";
import CharacterTableFooter from "./CharacterTableFooter";
import { formatGender } from "../utils";

const CharacterTableRow = ({ handleHeaderClick, characters }) => {
  return (
    <>
      <CharacterTableHeader handleHeaderClick={handleHeaderClick} />
      <tbody>
        {characters.map(character => (
          <tr key={character.name}>
            <td>{character.name}</td>
            <td>{formatGender(character.gender)}</td>
            <td>{character.height}</td>
          </tr>
        ))}
      </tbody>
      <CharacterTableFooter characters={characters} />
    </>
  );
};

export default CharacterTableRow;
