import React, { useEffect } from "react";
import axios from "axios";
import MovieTableRow from "./MovieTableRow";
import Loader from "../Loader";
import { sortCharacters, baseUrl, filterCharacters } from "../utils";
import { useAppState } from "../App/store";

const useFetchMovieCharacters = movie => {
  const {
    state,
    setAllCharacters,
    setCharacters,
    setSortAscending,
    setCharactersLoading,
    setCharactersError
  } = useAppState();
  const {
    charactersLoading,
    charactersError,
    characters,
    sortAscending,
    allCharacters
  } = state;

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
  };

  useEffect(() => {
    const fetchCharacters = async characters => {
      setCharactersLoading(true);
      let updatedCharacters = [];
      try {
        const valuesToFetch = characters.map(characterUrl => {
          const url = `${baseUrl}/${characterUrl.slice(21)}/`;
          return axios.get(url);
        });
        const resolvedAjaxRequest = await Promise.all(valuesToFetch);
        updatedCharacters = resolvedAjaxRequest.map(response => response.data);
      } catch (error) {
        setCharactersError(error.message);
        setCharactersLoading(false);
      }
      updateCharacters(updatedCharacters);
    };

    fetchCharacters(movie.characters);
  }, [movie]);

  return {
    charactersLoading,
    charactersError,
    characters,
    handleHeaderClick,
    handleGenderFilterClick
  };
};

const MoviesTable = ({ movie }) => {
  const {
    charactersLoading,
    charactersError,
    characters,
    handleHeaderClick,
    handleGenderFilterClick
  } = useFetchMovieCharacters(movie);

  if (charactersError) {
    return <p>{charactersError}</p>;
  } else if (charactersLoading) {
    return <Loader />;
  } else if (!charactersLoading && characters.length > 0) {
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
