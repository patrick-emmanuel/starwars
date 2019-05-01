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
import { actions } from "./actions";

const useFetchMovieCharacters = movie => {
  const { state, dispatch } = useCharacterState();
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
    dispatch({ type: actions.CHARACTERS, payload: sortedCharacters });
    dispatch({ type: actions.SORT_ASC });
  };

  const handleGenderFilterClick = e => {
    e.preventDefault();
    const value = e.target.value;
    const filteredCharacters = filterCharacters(value, allCharacters);
    dispatch({ type: actions.CHARACTERS, payload: filteredCharacters });
  };

  const updateCharacters = updatedCharacters => {
    dispatch({ type: actions.CHARACTERS, payload: updatedCharacters });
    dispatch({ type: actions.ALL_CHARACTERS, payload: updatedCharacters });
    dispatch({ type: actions.CHARACTERS_LOADING, payload: false });
  };

  useEffect(() => {
    const fetchCharacters = async characters => {
      dispatch({ type: actions.CHARACTERS_LOADING, payload: true });
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
        dispatch({ type: actions.CHARACTERS_ERROR, payload: error.message });
        dispatch({ type: actions.CHARACTERS_LOADING, payload: true });
      }
      cacheValues(movie.title, updatedCharacters);
      updateCharacters(updatedCharacters);
    };

    fetchCharacters(movie.characters);
  }, [movie, dispatch]);

  return {
    charactersLoading,
    charactersError,
    characters,
    handleHeaderClick,
    handleGenderFilterClick
  };
};

export default useFetchMovieCharacters;
