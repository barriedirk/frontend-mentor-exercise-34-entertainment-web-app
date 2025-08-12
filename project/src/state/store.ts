import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import reducers, { type RootState } from "./reducers";
import { persistMiddleware } from "./middlewares/persist-middleware";

// import { loadStateFromLocalStorage } from "./helpers/loadStateFromLocalStorage";

// const persistedState = loadStateFromLocalStorage();

// export const store = createStore(
//   reducers,
//   persistedState,
//   applyMiddleware(persistMiddleware, thunk)
// );

// export function configureStore(preloadedState?: Partial<RootState>) {
export function configureStore(preloadedState?: any) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(persistMiddleware, thunk)
  );
}
