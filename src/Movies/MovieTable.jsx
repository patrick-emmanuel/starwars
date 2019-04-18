import React, { useState, useEffect } from "react";
import MovieTableRow from "./MovieTableRow";
import Loader from "../Loader";
import {
  sortCharacters,
  baseUrl,
  filterCharacters,
  convertMapToArray
} from "../utils";

const useFetchMovieCharacters = movie => {
  const [errorText, setErrorText] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState(new Map());

  const handleHeaderClick = e => {
    e.preventDefault();
    const value = e.target.dataset.name;
    const sortedCharacters = sortCharacters(characters, sortAscending, value);
    setCharacters(sortedCharacters);
    setSortAscending(!sortAscending);
  };

  const handleGenderFilterClick = e => {
    e.preventDefault();
    const value = e.target.value;
    const filteredCharacters = filterCharacters(value, allCharacters);
    setCharacters(filteredCharacters);
  };

  const updateCharacters = updatedCharacters => {
    setCharacters(updatedCharacters);
    setAllCharacters(updatedCharacters);
    setLoading(false);
  };

  useEffect(() => {
    const fetchCharacters = async characters => {
      if (cache.has(movie.title)) {
        updateCharacters(cache.get(movie.title));
        return;
      }
      const updatedCharacters = [];
      try {
        setLoading(true);
        for (let characterUrl of characters) {
          const url = `${baseUrl}/${characterUrl.slice(21)}/`;
          const response = await fetch(url);
          if (response.status !== 200) {
            throw new Error("Failed to load characters");
          }
          const character = await response.json();
          updatedCharacters.push(character);
        }
      } catch (error) {
        setLoading(false);
        setErrorText(error.message);
      }
      const currentCacheEntries = convertMapToArray(cache);
      currentCacheEntries.push([movie.title, updatedCharacters]);
      setCache(new Map(currentCacheEntries));
      updateCharacters(updatedCharacters);
    };

    fetchCharacters(movie.characters);
  }, [movie.title]);

  return {
    loading,
    errorText,
    characters,
    sortAscending,
    handleHeaderClick,
    handleGenderFilterClick
  };
};

const MoviesTable = ({ movie }) => {
  const {
    loading,
    errorText,
    characters,
    handleHeaderClick,
    handleGenderFilterClick
  } = useFetchMovieCharacters(movie);
  
  if (errorText) {
    return <p>{errorText}</p>;
  } else if (loading) {
    return <Loader />;
  } else if (!loading && characters.length === 0) {
    return <p>No Characters available</p>;
  } else {
    return (
      <section className="wrapper">
        {
          <div className="wrapper">
            <select onClick={handleGenderFilterClick}>
              <option value="all">All</option>
              <option value="male">M</option>
              <option value="female">F</option>
            </select>
            <table>
              <MovieTableRow
                characters={characters}
                handleHeaderClick={handleHeaderClick}
                handleGenderFilterClick={handleGenderFilterClick}
              />
            </table>
          </div>
        }
      </section>
    );
  }
};

export default MoviesTable;
