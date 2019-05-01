import React from "react";
import { sumCharacterHeights } from "../utils";

const CharacterTableFooter = ({ characters }) => {
  const heightSum = sumCharacterHeights(characters);
  return (
    <tfoot>
      <tr>
        <td>{`${characters.length} Character(s)`}</td>
        <td />
        <td>
          {`${heightSum.cmValue}cm `}
          {`(${heightSum.feet}ft/`}
          {`${heightSum.inches}in)`}
        </td>
      </tr>
    </tfoot>
  );
};
export default CharacterTableFooter;
