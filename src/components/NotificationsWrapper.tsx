import { ReactNode, useEffect } from 'react';
import { useAddNotification } from '../context/notificationsContext';
import { socket } from '../constants/socket';
import { Notification } from '../context/notificationsContext';

export default function NotificationsWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const addNotification = useAddNotification();
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
      {children}
    </main>
  );
}
