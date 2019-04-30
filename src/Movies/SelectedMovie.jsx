import React from "react";
import OpeningCrawl from "./OpeningCrawl";
import CharacterTable from "../Character";

const SelectedMovie = ({ selectedMovie }) => (
  <div className="wrapper">
    <OpeningCrawl movie={selectedMovie} />
    <CharacterTable movie={selectedMovie} />
  </div>
);

export default SelectedMovie;
