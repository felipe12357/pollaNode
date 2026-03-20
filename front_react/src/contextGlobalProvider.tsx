import { createContext, useContext, useReducer, type Dispatch, type JSXElementConstructor, type ReactElement, type ReactNode } from "react";
import { appReducer, defaultAppState, type AppState } from "./redux/app.reducer";
import type { AppListAction } from "./redux/app.actions";

interface ContextType {
  appState: AppState,
  dispatch: Dispatch<AppListAction>,
}
 
export const GlobalContext = createContext<ContextType>({
  appState: defaultAppState,
  dispatch: ()=> {},
});
export const useContextGlobal = () => useContext(GlobalContext);
 
export const ContextGlobalProvider = (props: { children: ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> }) => {
  const [appState, dispatch] = useReducer(appReducer, defaultAppState);
  return (
      <GlobalContext.Provider value={{appState, dispatch}}>
          {props.children}
      </GlobalContext.Provider>
  )
}