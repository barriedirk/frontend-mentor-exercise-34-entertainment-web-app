import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import reducers from "./reducers";
import { persistMiddleware } from "./middlewares/persist-middleware";

export function configureStore(preloadedState?: any) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(persistMiddleware, thunk)
  );
}
