import { useNotifications } from '../../context/notificationsContext';
import NotificationCard from './NotificationCard';
import { v4 as uuidv4 } from 'uuid';
import './notifications.css';

export default function NotificationsContainer({
  toggleNotifications,
}: {
  toggleNotifications: boolean;
}) {
  const notifications = useNotifications();

  return (
    <div
      className={`notifications-container ${
        toggleNotifications ? 'active' : ''
      }`}
    >
      <h1>Notifications</h1>
      {notifications.map(({ message, sender }) => (
        <NotificationCard key={uuidv4()} {...{ ...sender, message }} />
      ))}
    </div>
  );
}
