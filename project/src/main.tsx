import "@/styles/index.css";
import "@/lib/localforage";

import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { AuthProvider } from "@/context/AuthProvider";

import { configureStore } from "@/state/store";
import { loadBookmarksState } from "@/state/helpers/loadStateFromLocalStorage";

import Loading from "@/components/splash/Splash";

const App = lazy(() => import("./App"));

async function init() {
  const preloadedState = await loadBookmarksState();
  const store = configureStore(preloadedState);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <HashRouter>
          <AuthProvider>
            <Suspense fallback={<Loading />}>
              <App />
            </Suspense>
          </AuthProvider>
        </HashRouter>
      </Provider>
    </StrictMode>
  );
}

init();
