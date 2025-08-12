import { useMovieContext } from "./MovieContext";

import Modal from "@/components/modals/Modal";
import MovieCaption from "./MovieCaption";
import MovieThumbnail from "./MovieThumbnail";

export default function MovieModal() {
  const { showModal, setShowModal, loading, error, trailerData } =
    useMovieContext();

  if (!showModal) return null;

  return (
    <Modal onClose={() => setShowModal(false)}>
      {loading && (
        <p className="text-white-custom text-preset-1">Loading trailer...</p>
      )}
      {!loading && error && (
        <p className="text-white-custom text-preset-1">
          Error Loading trailer...
        </p>
      )}
      {!loading && !error && trailerData?.key && (
        <iframe
          className="w-[80vw] h-[45vw] max-w-[960px] max-h-[540px]"
          src={`https://www.youtube.com/embed/${trailerData.key}`}
          title="YouTube trailer"
          allowFullScreen
        ></iframe>
      )}

      {!loading && !error && !trailerData?.key && (
        <p className="text-white-custom text-preset-1">No trailer found.</p>
      )}

      <div className="mt-[20px] flex gap-5 items-start justify-start">
        <MovieThumbnail />
        <MovieCaption isTrailer={true} />
      </div>
    </Modal>
  );
}
