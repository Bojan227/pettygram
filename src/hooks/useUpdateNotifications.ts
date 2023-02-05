import { useState } from 'react';
import fetcher from '../api/fetcher';
import { url } from '../constants/api';

export default function useUpdateNotifications() {
  const [errorMessage, setErrorMessage] = useState('');

  const updateNotifications = async (receiverId: string) => {
    try {
      await fetcher(`${url}/notifications?receiverId=${receiverId}`, {
        method: 'PUT',
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return { updateNotifications, errorMessage };
}
