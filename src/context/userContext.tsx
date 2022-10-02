import { createContext, useReducer, useEffect } from 'react';

interface UserContextInterface {
  user: { username: string; firstName: string; lastName: string };
  dispatch: (action: {
    type: string;
    payload: { username: string; firstName: string; lastName: string };
  }) => void;
}

interface UserContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}
export const UserContext = createContext<UserContextInterface | null>(null);

export const userReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
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

  useEffect(() => {
    const userState: { username: string; firstName: string; lastName: string } =
      JSON.parse(localStorage.getItem('user') || '');

    if (userState) {
      dispatch({
        type: 'LOGIN',
        payload: userState,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
