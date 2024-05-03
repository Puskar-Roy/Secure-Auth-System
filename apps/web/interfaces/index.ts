import { ReactNode } from "react";

export interface State {
  user: User | null;
}

export interface User {
  token?: string;
  email?: string;
  id?: string;
  name?: string;
}

export interface Action {
  type: string;
  payload?: unknown;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}


export interface LoginData {
  email: string;
  password: string;
}