import { ReactNode, useEffect } from 'react';
import { useAddNotification } from '../context/notificationsContext';
import { socket } from '../constants/socket';
import { Notification } from '../context/notificationsContext';
import useGetNotificationsData from '../hooks/useGetNotificationsData';
import useUserContext from '../hooks/useUserContext';
import { useNotifications } from '../context/notificationsContext';

export default function NotificationsWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const addNotification = useAddNotification();
  const { getNotificationsByReceiverId, error } = useGetNotificationsData();
  const userContext = useUserContext();

  useEffect(() => {
    getNotificationsByReceiverId(userContext?.user._id!);
  }, [userContext?.user._id]);

  useEffect(() => {
    socket.on('receive_notification', (data: Notification) => {
      console.log(data);
      addNotification(data);
    });

    return () => {
      socket.off('receive_notification');
    };
  }, []);

  return (
    <main className="flex bg-stone-50 justify-center min-h-screen">
      {error && error}
      {children}
    </main>
  );
}
