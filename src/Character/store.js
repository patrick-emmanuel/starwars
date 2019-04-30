import React, { useContext, useReducer, useMemo, createContext } from "react";
import { characterReducer } from "./reducer";
import { actions } from "./actions";

const CharacterContext = createContext();

const defaultState = {
  allCharacters: [],
  characters: [],
  sortAscending: true,
  charactersLoading: false,
  charactersError: ""
};

const CharacterProvider = props => {
  const [state, dispatch] = useReducer(characterReducer, defaultState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <CharacterContext.Provider value={value} {...props} />;
};

export const useCharacterState = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(`useCharacterState must be a child of CharacterProvider`);
  }
  const [state, dispatch] = context;
  const setAllCharacters = payload => {
    dispatch({ type: actions.ALL_CHARACTERS, payload });
  };
  const setCharacters = payload => {
    dispatch({ type: actions.CHARACTERS, payload });
  };
  const setSortAscending = () => dispatch({ type: actions.SORT_ASC });
  const setCharactersLoading = payload => {
    dispatch({ type: actions.CHARACTERS_LOADING, payload });
  };
  const setCharactersError = payload => {
    dispatch({ type: actions.CHARACTERS_ERROR, payload });
  };

  return {
    state,
    setAllCharacters,
    setCharacters,
    setSortAscending,
    setCharactersLoading,
    setCharactersError
  };
};

export default CharacterProvider;
