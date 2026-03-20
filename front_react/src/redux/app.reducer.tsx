import type { UserData } from "../dtos/user"
import { GetSessionUser } from "../utilities/session.storage";
import { ACTION_TYPES_APP, type AppListAction } from "./app.actions"

export interface AppState {
  user: UserData | null,
}

export const defaultAppState = {
  user: GetSessionUser(),
}

export const appReducer = (state: AppState, action: AppListAction): AppState => {
  switch(action.type) {
    case ACTION_TYPES_APP.SET_USER: {
      state = { ...state, user: action.payload};
      return state;
    }
    default:
      return state;
  }
}