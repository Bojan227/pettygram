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
    <div onClick={(e) => e.stopPropagation()} className="notification-card">
      <img src={imageUrl} />
      <p>{username}</p>
      <p>{message}</p>
    </div>
  );
}
