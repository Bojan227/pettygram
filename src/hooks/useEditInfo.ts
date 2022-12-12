import { useState } from 'react';
import fetcher from '../api/fetcher';
import useUserContenxt from './useUserContext';

export default function useEditInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const userContext = useUserContenxt();

  const editInfo = async (
    username: string,
    firstName: string,
    lastName: string
  ) => {
    setIsLoading(true);
    try {
      const updatedUser = await fetcher('http://localhost:4000/user/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
        }),
      });

      userContext?.dispatch({ type: 'LOGIN', payload: updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage('user info updated');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { editInfo, isLoading, error, message };
}