import "@/styles/index.css";

import { lazy, StrictMode, Suspense } from "react";

import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "@/state/index";

// import ErrorBoundary from "@components/ErrorBoundary";

import Loading from "@/components/splash/Splash";

const App = lazy(async () => {
  const App = import("./App.tsx");

  return App;
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </HashRouter>
    </Provider>
  </StrictMode>
);
