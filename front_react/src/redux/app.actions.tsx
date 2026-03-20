import type { UserData } from "../dtos/user";

export const ACTION_TYPES_APP = {
  SET_USER: "SET_USER",
}

export type AppListAction =
  | { type: typeof ACTION_TYPES_APP.SET_USER; payload: UserData}