/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const MovieCardContext = createContext();

export const MovieCardProvider = ({ children }) => {
  const [movieCard, setMovieCard] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const values = { movieCard, setMovieCard, searchResult, setSearchResult };
  return (
    <MovieCardContext.Provider value={values}>
      {children}
    </MovieCardContext.Provider>
  );
};

export const useMovieCard = () => useContext(MovieCardContext);