import { combineReducers } from "redux";

import bookmarksReducer from "./bookmarksReducer";

const reducers = combineReducers({
  bookmarks: bookmarksReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
