import { useState } from 'react';
import useUserContext from './useUserContext';

export const useFollow = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const userContext = useUserContext();

  const changeFollowStatus = async (userId: string) => {
    const res = await fetch(`http://localhost:4000/user/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const { user, id, error } = await res.json();

    if (res.ok) {
      userContext?.dispatch({ type: 'UPDATE', payload: id });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      setErrorMessage(error);
    }
  };

  return { changeFollowStatus, errorMessage };
};
