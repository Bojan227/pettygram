import { createContext, useReducer, useEffect } from 'react';
import { Post } from '../components/feed/types/feedTypes';
import useLogout from '../hooks/useLogout';

export type UserType = {
  _id?: string | undefined;
  username?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  imageUrl?: string | undefined;
  followers?: (UserType | undefined)[];
  following?: (UserType | undefined)[];
  saved?: Post[];
  imageId?: string;
};

interface UserContextInterface {
  user: UserType;
  dispatch: (action: ActionType) => void;
}

type ActionType =
  | { type: 'LOGIN'; payload: UserType }
  | { type: 'LOGOUT'; payload: undefined | string }
  | {
      type: 'UPDATE_FOLLOWING';
      payload: { userId: string; updatedUser: UserType };
    }
  | {
      type: 'UPDATE_SAVED';
      payload: { postId: string; post: Post };
    };

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
    case 'UPDATE_FOLLOWING':
      return {
        user: {
          ...state.user,
          following: state.user.following?.find(
            ({ _id }: { _id: string }) => _id === action.payload.userId
          )
            ? state.user.following?.filter(
                ({ _id }: { _id: string }) => _id !== action.payload.userId
              )
            : [...state.user.following, action.payload.updatedUser],
        },
      };
    case 'UPDATE_SAVED':
      return {
        user: {
          ...state.user,
          saved: state.user.saved?.find(
            ({ _id }: { _id: string }) => _id === action.payload.postId
          )
            ? state.user.saved?.filter(
                ({ _id }: { _id: string }) => _id !== action.payload.postId
              )
            : [...state.user.saved, action.payload.post],
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
  const { logout } = useLogout();

  useEffect(() => {
    const userState = JSON.parse(`${localStorage.getItem('user')}`);
    // const index = document.cookie
    //   ?.split('; ')
    //   ?.findIndex((value) => value?.includes('token'));

    // const token = `Bearer ${
    //   document?.cookie?.split('; ')[index]?.split('=')[1] || undefined
    // }`;
    if (
      !document.cookie
        ?.split('; ')
        ?.find((value) => value?.includes('token'))
        ?.split('=')[1]
    ) {
      logout();
    } else if (userState) {
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
