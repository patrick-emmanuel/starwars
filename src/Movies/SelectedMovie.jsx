import React from "react";
import OpeningCrawl from "./OpeningCrawl";
import MoviesTable from "./MovieTable";

const SelectedMovie = ({ selectedMovie }) => (
  <div className="wrapper">
    <OpeningCrawl movie={selectedMovie} />
    <MoviesTable movie={selectedMovie} />
  </div>
);

export default SelectedMovie;
