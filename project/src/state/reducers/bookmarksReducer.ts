import { produce } from "immer";
import { ActionType } from "@/state/action-types";
import { type Action } from "@/state/actions";
import { type BookmarksState } from "@/models/bookmarksState";

const initialState: BookmarksState = {
  list: [],
  data: {},
};

const reducer = produce(
  (state: BookmarksState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.ADD_MEDIA: {
        const { id, item } = action.payload;

        state.data[id] = item;
        state.list = [...state.list, id];

        return state;
      }

      case ActionType.DELETE_MEDIA: {
        const idToRemove = action.payload;

        state.list = state.list.filter((id) => id != idToRemove);
        delete state.data[idToRemove];

        return state;
      }

      case ActionType.CLEAR: {
        return initialState;
      }

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
