import { createContext, useReducer, useEffect } from 'react';

export type UserType = {
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  imageUrl: string | undefined;
  _id: string | undefined;
  followers: (UserType | undefined)[];
  following: (UserType | undefined)[];
};

interface UserContextInterface {
  user: UserType;
  dispatch: (action: ActionType) => void;
}

type ActionType =
  | { type: 'LOGIN'; payload: UserType }
  | { type: 'LOGOUT'; payload: null }
  | { type: 'UPDATE'; payload: { userId: string; newUser: UserType } };

interface UserContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}
export const UserContext = createContext<UserContextInterface | null>(null);

export const userReducer = (state: any, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return { user: payload };
    case 'LOGOUT':
      return { user: null };
    case 'UPDATE':
      return {
        user: {
          ...state.user,
          following: state.user.following?.includes(action.payload.userId)
            ? state.user.following?.filter(
                ({ _id }: { _id: string }) => _id !== action.payload.userId
              )
            : [...state.user.following, action.payload.newUser],
        },
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  useEffect(() => {
    const userState = JSON.parse(`${localStorage.getItem('user')}`);

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
