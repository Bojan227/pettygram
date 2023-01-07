import { useState } from 'react';
import fetcher from '../api/fetcher';
import useUserContext from './useUserContext';

export default function useUpdateProfilePicture() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const userContext = useUserContext();

  const updateProfilePicture = async (newImage: string) => {
    try {
      setIsLoading(true);
      const { message, updatedUser } = await fetcher(
        'http://localhost:4000/user/photo',
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
            newImage,
          }),
        }
      );
      setMessage(message);
      userContext?.dispatch({ type: 'LOGIN', payload: updatedUser });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfilePicture, isLoading, message, error };
}
