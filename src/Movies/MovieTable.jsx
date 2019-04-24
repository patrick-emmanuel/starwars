import React, { useState, useEffect } from "react";
import axios from "axios";
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
      setLoading(true);
      if (cache.has(movie.title)) {
        updateCharacters(cache.get(movie.title));
        return;
      }
      let updatedCharacters = [];
      try {
        const valuesToFetch = characters.map(characterUrl => {
          const url = `${baseUrl}/${characterUrl.slice(21)}/`;
          return axios.get(url);
        });
        const resolvedAjaxRequest = await Promise.all(valuesToFetch);
        updatedCharacters = resolvedAjaxRequest.map(response => response.data);
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
  }, [movie, cache]);

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
  } else if (!loading && characters.length > 0) {
    return (
      <section className="wrapper">
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
      </section>
    );
  } else {
    return null;
  }
};

export default MoviesTable;
