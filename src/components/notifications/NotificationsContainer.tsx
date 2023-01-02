import { useNotifications } from '../../context/notificationsContext';
import NotificationCard from './NotificationCard';
import { v4 as uuidv4 } from 'uuid';
import './notifications.css';

export default function NotificationsContainer() {
  const notifications = useNotifications();

  return (
    <div className="notifications-container">
      {notifications.map(({ message, senderId }) => (
        <NotificationCard key={uuidv4()} {...{ ...senderId, message }} />
      ))}
    </div>
  );
}
