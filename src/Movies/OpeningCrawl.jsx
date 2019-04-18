import React from "react";

const OpeningCrawl = ({ movie }) => {
  return <marquee className="opening-crawl">{movie.opening_crawl}</marquee>;
};

export default OpeningCrawl;
