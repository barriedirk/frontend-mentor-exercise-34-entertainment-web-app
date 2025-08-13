import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AuthGuard from "@/components/auth/AuthGuard";

import Home from "@/features/home/Home";

import MainLayout from "@/layouts/mainLayout/MainLayout";
import AuthLayout from "@/layouts/authLayout/AuthLayout";

const Login = lazy(() => import("./features/auth/Login"));
const SignUp = lazy(() => import("./features/auth/SignUp"));

const Mockup = lazy(() => import("./features/mockup/Mockup"));
const Movies = lazy(() => import("./features/movies/Movies"));
const TVSeries = lazy(() => import("./features/tv-series/TVSeries"));
const Bookmarks = lazy(() => import("./features/bookmarks/Bookmarks"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="mockup" element={<Mockup />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tv-series" element={<TVSeries />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
