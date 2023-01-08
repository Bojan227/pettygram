import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

type NotificatonCardProps = {
  imageUrl?: string | undefined;
  username?: string;
  message: string;
  createdAt: string;
  _id?: string | undefined;
};
import default_insta from '../../assets/default_insta.jpg';

export default function NotificationCard({
  imageUrl,
  username,
  message,
  createdAt,
  _id,
}: NotificatonCardProps) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="notification-card">
      <img src={imageUrl || default_insta} />

      <div className="notification-content">
        <Link to={`/profile/${_id}`}>
          <p>
            {`${username} ${message} ${
              createdAt
                ? formatDistanceToNow(new Date(createdAt).getTime())
                : ''
            }`}
          </p>
        </Link>
      </div>
    </div>
  );
}
