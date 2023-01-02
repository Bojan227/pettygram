import { useNotifications } from '../../context/notificationsContext';
export default function NotificaitonsNavContainer() {
  const notifications = useNotifications();

  const numberOfUnreadNotifications = notifications.filter(
    (notification) => notification.read === false
  );

  return numberOfUnreadNotifications.length === 0 ? null : (
    <div className="notification-msg">{numberOfUnreadNotifications.length}</div>
  );
}
