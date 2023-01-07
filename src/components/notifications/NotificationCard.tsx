type NotificatonCardProps = {
  imageUrl?: string | undefined;
  username?: string;
  message: string;
};
import default_insta from '../../assets/default_insta.jpg';

export default function NotificationCard({
  imageUrl,
  username,
  message,
}: NotificatonCardProps) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="notification-card">
      <img src={imageUrl || default_insta} />
      <p>{username}</p>
      <p>{message}</p>
    </div>
  );
}
