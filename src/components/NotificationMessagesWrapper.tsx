import { ReactNode, useEffect } from 'react';
import { useAddNotificationMessage } from '../context/notificationsMessagesContext';
import { ChatType } from '../context/chatDataContext';
import { socket } from '../constants/socket';

export default function NotificationMessagesWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const addNotificationMessage = useAddNotificationMessage();
  useEffect(() => {
    socket.on('notification_message', (data: ChatType) => {
      console.log(data);
      addNotificationMessage(data);
    });
    console.log();
    return () => {
      socket.off('notification_message');
    };
  }, []);

  return <main>{children}</main>;
}
