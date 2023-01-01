import { Link } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import { useNewMessages } from '../../context/notificationsMessagesContext';

type NavigationLinkProps = {
  title: string;
  link: string;
  url: string | undefined;
  toggleCreatePost: () => void;
};

export const NavigationLink = ({
  title,
  link,
  url,
  toggleCreatePost,
}: NavigationLinkProps): JSX.Element => {
  const userContext = useUserContext();

  const newMessages = useNewMessages();
  const uniqueMessages = [
    ...new Set(newMessages.map(({ senderId }) => senderId)),
  ];

  console.log(uniqueMessages);
  return (
    <Link
      to={link === 'profile' ? `${link}/${userContext?.user._id}` : link}
      className={
        (title === 'Notifications' ? 'notification-link' : '') ||
        (title === 'Profile' ? 'profile-link' : '')
      }
      onClick={() => title === 'Create' && toggleCreatePost()}
    >
      <li>
        <div>
          <img
            src={`${url === 'profile' ? userContext?.user.imageUrl : url}`}
            alt="img"
          />
          {title === 'Messages' &&
            (uniqueMessages.length === 0 ? null : (
              <div className="notification-msg">{uniqueMessages.length}</div>
            ))}
        </div>
        <h3>{title}</h3>
      </li>
    </Link>
  );
};
