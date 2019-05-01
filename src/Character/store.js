import React, { useContext, useReducer, useMemo, createContext } from "react";
import { characterReducer } from "./reducer";

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

  return {
    state,
    dispatch
  };
};

export default CharacterProvider;
