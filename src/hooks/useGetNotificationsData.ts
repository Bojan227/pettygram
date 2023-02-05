import { useState } from 'react';
import fetcher from '../api/fetcher';
import { useAddNotifications } from '../context/notificationsContext';
import { url } from '../constants/api';

export default function useGetNotificationsData() {
  const addNotifications = useAddNotifications();
  const [error, setError] = useState('');

  const getNotificationsByReceiverId = async (receiverId: string) => {
    try {
      const notifications = await fetcher(
        `${url}/notifications?receiverId=${receiverId}`
      );

      addNotifications(notifications);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return { error, getNotificationsByReceiverId };
}
