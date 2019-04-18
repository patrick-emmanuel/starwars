import React from "react";
import OpeningCrawl from "./OpeningCrawl";
import MoviesTable from "./MovieTable";
import logo from "../logo.png";

const SelectedMovie = ({ selectedMovie }) => (
  <div className="wrapper">
    <img src={logo} alt="logo" width="200" height="150" />
    <OpeningCrawl movie={selectedMovie} />
    <MoviesTable movie={selectedMovie} />
  </div>
);

export default SelectedMovie;
