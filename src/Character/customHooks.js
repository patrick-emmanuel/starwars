import { useEffect } from "react";
import axios from "axios";
import {
  sortCharacters,
  baseUrl,
  filterCharacters,
  retrieveCacheValues,
  cacheValues
} from "../utils";
import { useCharacterState } from "./store";

const useFetchMovieCharacters = movie => {
  const {
    state,
    setAllCharacters,
    setCharacters,
    setSortAscending,
    setCharactersLoading,
    setCharactersError
  } = useCharacterState();
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
    setCharactersLoading(false);
  };

  useEffect(() => {
    const fetchCharacters = async characters => {
      setCharactersLoading(true);
      const cachedCharacters = retrieveCacheValues(movie.title);
      if (cachedCharacters) {
        updateCharacters(cachedCharacters);
        return;
      }
      let updatedCharacters = [];
      try {
        const valuesToFetch = characters.map(characterUrl => {
          const url = `${baseUrl}/${characterUrl.slice(21)}`;
          return axios.get(url);
        });
        const resolvedAjaxRequest = await Promise.all(valuesToFetch);
        updatedCharacters = resolvedAjaxRequest.map(response => response.data);
      } catch (error) {
        setCharactersError(error.message);
        setCharactersLoading(false);
      }
      cacheValues(movie.title, updatedCharacters);
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

export default useFetchMovieCharacters;
