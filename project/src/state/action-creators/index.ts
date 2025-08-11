import { ActionType } from "@/state/action-types";
import { type Dispatch } from "redux";

import localforage from "localforage";

import type {
  AddMediaAction,
  DeleteMediaAction,
  ClearMediaAction,
  Action,
} from "@state/actions";

import type { MediaItem } from "@/models/media";
import type { RootState } from "@state/reducers";

export const updateBookmark = (id: string, item: MediaItem): AddMediaAction => {
  return {
    type: ActionType.ADD_MEDIA,
    payload: {
      id,
      item,
    },
  };
};

export const deleteBookmark = (id: string): DeleteMediaAction => {
  return {
    type: ActionType.DELETE_MEDIA,
    payload: id,
  };
};

export const clearBookmark = (): ClearMediaAction => {
  return {
    type: ActionType.CLEAR,
  };
};

export const saveBookmarks = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { bookmarks } = getState();

    try {
      localforage
        .setItem("bookmarks", JSON.stringify(bookmarks))
        .then(() => {
          console.log("Data stored successfully!");
        })
        .catch((error) => {
          console.error("Error storing data:", error);
        });
    } catch (err) {
      console.error(`Error to save bookmarks into localstorage: ${err}`);
    }
  };
};
