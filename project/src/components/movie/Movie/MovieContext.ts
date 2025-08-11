import { createContext, useContext } from "react";

import type { FetchTrailerResponse } from "@/api/tmdb";

import type { MediaItem, MediaType } from "@/models/media";
import type { CustomError } from "@/models/useApiCall";

export interface MovieContextProps {
  item: MediaItem;
  type: MediaType;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  fetchTrailer: () => void;
  trailerData: FetchTrailerResponse | null;
  loading: boolean;
  error: CustomError;
}

export const MovieContext = createContext<MovieContextProps | undefined>(
  undefined
);

export function useMovieContext() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("Movie compound components must be inside <Movie>");
  }

  return context;
}
