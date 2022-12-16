import { useState } from 'react';
import fetcher from '../api/fetcher';
import useUserContext from './useUserContext';

export const useFollow = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const userContext = useUserContext();

  const changeFollowStatus = async (userId: string) => {
    const { user, updatedUser, error } = await fetcher(
      `http://localhost:4000/user/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            document.cookie
              ?.split('; ')
              ?.find((value) => value?.includes('token'))
              ?.split('=')[1]
          }`,
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (user) {
      userContext?.dispatch({
        type: 'UPDATE_FOLLOWING',
        payload: { userId, updatedUser },
      });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      setErrorMessage(error);
    }
  };

  return { changeFollowStatus, errorMessage };
};
