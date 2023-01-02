import { useNewMessages } from '../../context/notificationsMessagesContext';

export default function MessagesNavContainer() {
  const newMessages = useNewMessages();
  const uniqueMessages = [
    ...new Set(newMessages.map(({ senderId }) => senderId)),
  ];

  return uniqueMessages.length === 0 ? null : (
    <div className="notification-msg">{uniqueMessages.length}</div>
  );
}
