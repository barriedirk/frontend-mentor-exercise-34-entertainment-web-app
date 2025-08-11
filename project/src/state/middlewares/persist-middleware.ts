import { type Dispatch } from "redux";
import { type Action } from "@/state/actions";
import { ActionType } from "@/state/action-types";

import { type RootState } from "@/state/reducers";

import { type ThunkMiddleware } from "redux-thunk";
import { saveBookmarks } from "@/state/action-creators";

interface PersistMiddlewareStoreProps {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}

type PersistMiddlewareNextProps = (action: unknown) => void; // Type action as `unknown` to align with

export const persistMiddleware: ThunkMiddleware<RootState, Action> = ({
  dispatch,
  getState,
}: PersistMiddlewareStoreProps) => {
  let timer: ReturnType<typeof setTimeout>;

  return (next: PersistMiddlewareNextProps) => {
    return (action: unknown) => {
      const typedAction = action as Action;

      next(typedAction);

      if (
        [
          ActionType.ADD_MEDIA,
          ActionType.DELETE_MEDIA,
          ActionType.CLEAR,
        ].includes(typedAction.type)
      ) {
        if (timer) clearTimeout(timer);

        // Delay saveCells dispatch to debounce saving cells
        timer = setTimeout(() => {
          saveBookmarks()(dispatch, getState);
        }, 250);
      }
    };
  };
};
