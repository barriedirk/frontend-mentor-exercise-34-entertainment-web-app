import { useState, useMemo, useCallback, type ReactNode, type FC } from "react";

import MovieImage from "./MovieImage";
import MovieThumbnail from "./MovieThumbnail";
import MovieCaption from "./MovieCaption";
import MoviePlayButton from "./MoviePlayButton";
import MovieBookmark from "./MovieBookmark";
import MovieModal from "./MovieModal";

import { type MediaType, type MediaItem } from "@/models/media";

import { fetchTrailerMedia, type FetchTrailerResponse } from "@/api/tmdb";

import { useApi } from "@/hooks/useApi";
import { MovieContext } from "./MovieContext";
import type { MovieContextProps } from "./MovieContext";

import styles from "./Movie.module.css";
import clsx from "clsx";
import { useFadeInOnView } from "@/hooks/useFadeInOnView";

interface MovieProps {
  item: MediaItem;
  type: MediaType;
  children: ReactNode;
}

interface MovieComponent extends FC<MovieProps> {
  Image: FC;
  Caption: FC;
  PlayButton: FC;
  Bookmark: FC;
  Modal: FC;
  Thumbnail: FC;
}

type ParamType = [number, "movie" | "tv"];

const Movie: MovieComponent = ({ item, type, children }: MovieProps) => {
  const ref = useFadeInOnView(100);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isMovie = item.category === "Movie";

  const isRegular = type === "regular";
  const isTrending = type === "trending";
  const isPoster = type === "poster";

  const params = useMemo<ParamType>(
    () => [item.id, isMovie ? "movie" : "tv"] as const,
    [item, isMovie]
  );

  const { loading, error, data, fetch, controller } = useApi<
    FetchTrailerResponse,
    ParamType
  >(fetchTrailerMedia, {
    autoFetch: false,
    params,
  });

  const fetchTrailer = useCallback(() => {
    if (controller) controller.abort();
    fetch(params);
    setShowModal(true);
  }, [fetch, controller, params]);

  const value: MovieContextProps = {
    item,
    type,
    isLoaded,
    setIsLoaded,
    showModal,
    setShowModal,
    fetchTrailer,
    trailerData: data,
    loading,
    error,
  };

  return (
    <MovieContext.Provider value={value}>
      <figure
        ref={ref}
        className={clsx(
          "fade-start",
          styles["movie"],
          isRegular && styles["movie--regular"],
          isTrending && styles["movie--trending"],
          isPoster && styles["movie--poster"]
        )}
      >
        {children}
      </figure>
      {showModal && <Movie.Modal />}
    </MovieContext.Provider>
  );
};

Movie.Image = MovieImage;
Movie.Thumbnail = MovieThumbnail;
Movie.Caption = MovieCaption;
Movie.PlayButton = MoviePlayButton;
Movie.Bookmark = MovieBookmark;
Movie.Modal = MovieModal;

export default Movie;
