import { createContext, useReducer, useEffect } from 'react';

type UserType = {
  username: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  _id: string;
  followers: [string];
  following: [string];
};

interface UserContextInterface {
  user: UserType;
  dispatch: (action: { type: string; payload: UserType | string }) => void;
}

// type ActionsMap = {
//   LOGIN: UserType;
//   LOGOUT: null;
//   UPDATE: string;
// };

// type Actions = {
//   [Key in keyof ActionsMap]: {
//     type: Key;
//     payload: ActionsMap[Key];
//   };
// }[keyof ActionsMap];

interface UserContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}
export const UserContext = createContext<UserContextInterface | null>(null);

export const userReducer = (state: any, action: any) => {
  const { type, payload } = action;

  console.log(state, action.payload);
  switch (type) {
    case 'LOGIN':
      return { user: payload };
    case 'LOGOUT':
      return { user: null };
    case 'UPDATE':
      return {
        user: {
          ...state.user,
          following: state.user.following?.includes(action.payload)
            ? state.user.following?.filter(
                (_id: string) => _id !== action.payload
              )
            : [...state.user.following, action.payload],
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

    console.log('user here');
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
