import React from "react";
import Movies from "./Movies";
import CharacterProvider from "./Character/store";
import MovieProvider from "./Movies/store";

const App = () => {
  return (
    <CharacterProvider>
      <MovieProvider>
        <Movies />
      </MovieProvider>
    </CharacterProvider>
  );
};

export default App;
