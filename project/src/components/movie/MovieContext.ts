import { createContext, useContext } from "react";

export const MovieContext = createContext(null);

export function useMovieContext() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("Movie compound components must be inside <Movie>");
  }

  return context;
}
