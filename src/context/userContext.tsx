import React, { createContext, useReducer } from 'react';
import { ReactNode } from 'react';

interface UserContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}
export const UserContext = createContext('');

export const userReducer = (state: any, type: any) => {
  const { action, payload } = type;

  switch (action) {
    case 'LOGIN':
      return { user: payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
