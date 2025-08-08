import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/features/home/Home";
import MainLayout from "@/layouts/mainLayout/MainLayout";

const Movies = lazy(() => import("./features/movies/Movies"));
const TVSeries = lazy(() => import("./features/tv-series/TVSeries"));
const Bookmarks = lazy(() => import("./features/bookmarks/Bookmarks"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-series" element={<TVSeries />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
