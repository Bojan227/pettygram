import { useState } from 'react';
import fetcher from '../api/fetcher';

export default function useUpdateNotifications() {
  const [errorMessage, setErrorMessage] = useState('');

  const updateNotifications = async (receiverId: string) => {
    try {
      await fetcher(
        `http://localhost:4000/notifications?receiverId=${receiverId}`,
        {
          method: 'PUT',
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return { updateNotifications, errorMessage };
}
