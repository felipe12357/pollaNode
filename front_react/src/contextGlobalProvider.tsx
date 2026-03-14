import { createContext, useContext, useState, type JSXElementConstructor, type ReactElement, type ReactNode } from "react";
import type { UserLoginRDto } from './dtos/user';

type dataGlobalContext = {
  user: Omit<UserLoginRDto, 'token'>,
  setUser: (user:Omit<UserLoginRDto, 'token'>)=> void,
}
 
export const GlobalContext = createContext({});
export const useContextGlobal = () => useContext(GlobalContext) as dataGlobalContext;
 
export const ContextGlobalProvider = (props: { children: ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> }) => {
  const [user,setUser] = useState(); //TODO migrar a useReducer

  return (
      <GlobalContext.Provider value={{user, setUser}}>
          {props.children}
      </GlobalContext.Provider>
  )
}