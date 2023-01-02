type NotificatonCardProps = {
  imageUrl?: string | undefined;
  username?: string;
  message: string;
};

export default function NotificationCard({
  imageUrl,
  username,
  message,
}: NotificatonCardProps) {
  return (
    <div className="notification-card">
      <img width="32px" src={imageUrl} />
      <p>{username}</p>
      <p>{message}</p>
    </div>
  );
}