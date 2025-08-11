import { ActionType } from "@/state/action-types";

import type { MediaItem } from "@/models/media";

export interface AddMediaAction {
  type: ActionType.ADD_MEDIA;
  payload: {
    id: string;
    item: MediaItem;
  };
}

export interface DeleteMediaAction {
  type: ActionType.DELETE_MEDIA;
  payload: string; // id
}

export interface ClearMediaAction {
  type: ActionType.CLEAR;
}

export type Action = AddMediaAction | DeleteMediaAction | ClearMediaAction;
