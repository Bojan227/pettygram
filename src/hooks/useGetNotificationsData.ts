import { useState } from 'react';
import fetcher from '../api/fetcher';
import { useAddNotifications } from '../context/notificationsContext';

export default function useGetNotificationsData() {
  const addNotifications = useAddNotifications();
  const [error, setError] = useState('');

  const getNotificationsByReceiverId = async (receiverId: string) => {
    console.log(receiverId);
    try {
      const notifications = await fetcher(
        `http://localhost:4000/notifications?receiverId=${receiverId}`
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
