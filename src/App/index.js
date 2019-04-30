import React, { useReducer, useMemo, createContext } from "react";
import Movies from "../Movies";
import { appReducer } from "./reducers";

const defaultAppState = {
  allCharacters: [],
  characters: [],
  movies: [],
  sortAscending: true,
  selectedMovie: null,
  movieLoading: false,
  charactersLoading: false,
  movieError: "",
  charactersError: ""
};

export const AppContext = createContext();

const AppProvider = props => {
  const [state, dispatch] = useReducer(appReducer, defaultAppState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <AppContext.Provider value={value} {...props} />;
};

const App = () => {
  return (
    <AppProvider>
      <Movies />
    </AppProvider>
  );
};

export default App;
