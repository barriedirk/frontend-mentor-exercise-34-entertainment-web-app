import { useMovieContext } from "./MovieContext";

import Modal from "@/components/modals/Modal";
import MovieCaption from "./MovieCaption";

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
          src={`https://www.youtube.com/embed/${trailerData.key}`}
          className="w-full aspect-video max-w-[960px]"
          title="YouTube trailer"
        ></iframe>
      )}

      {!loading && !error && !trailerData?.key && (
        <p className="text-white-custom text-preset-1">No trailer found.</p>
      )}

      <div className="mt-10 flex gap-2 flex-col">
        <MovieCaption />
      </div>
    </Modal>
  );
}
