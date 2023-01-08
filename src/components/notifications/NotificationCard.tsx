import { formatDistanceToNow } from 'date-fns';

type NotificatonCardProps = {
  imageUrl?: string | undefined;
  username?: string;
  message: string;
  createdAt: string;
};
import default_insta from '../../assets/default_insta.jpg';

export default function NotificationCard({
  imageUrl,
  username,
  message,
  createdAt,
}: NotificatonCardProps) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="notification-card">
      <img src={imageUrl || default_insta} />
      <p>{username}</p>
      <p>{message}</p>
      <p>{createdAt && formatDistanceToNow(new Date(createdAt).getTime())}</p>
    </div>
  );
}
