import { createContext, useContext } from "react";

interface IContext {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
  getordrs:()=>void
  orders:any
}

export const AuthContext = createContext<IContext>({
  username: null,
  token: null,
  login: () => {},
  isAuthenticated: false,
  logout: () => {},
  getordrs:()=>{},
  orders:[]
});

export const useAuth = () => useContext(AuthContext);
