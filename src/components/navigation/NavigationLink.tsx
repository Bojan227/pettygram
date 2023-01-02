import { Link } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import MessagesNavContainer from './MessagesNavContainer';
import NotificaitonsNavContainer from './NotificationsNavContainer';

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
          {title === 'Messages' && <MessagesNavContainer />}
          {title === 'Notifications' && <NotificaitonsNavContainer />}
        </div>
        <h3>{title}</h3>
      </li>
    </Link>
  );
};
