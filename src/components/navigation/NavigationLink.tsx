import { Link } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import MessagesNavContainer from './MessagesNavContainer';
import NotificaitonsNavContainer from './NotificationsNavContainer';
import { useFilterNotifications } from '../../context/notificationsContext';
import useUpdateNotifications from '../../hooks/useUpdateNotifications';

type NavigationLinkProps = {
  title: string;
  link: string;
  url: string | undefined;
  toggleCreatePost: () => void;
  toggleNotifications: () => void;
};

export const NavigationLink = ({
  title,
  link,
  url,
  toggleCreatePost,
  toggleNotifications,
}: NavigationLinkProps): JSX.Element => {
  const userContext = useUserContext();
  const filterNotifications = useFilterNotifications();
  const { updateNotifications } = useUpdateNotifications();

  return (
    <Link
      to={link === 'profile' ? `${link}/${userContext?.user._id}` : link}
      className={
        (title === 'Notifications' ? 'notification-link' : '') ||
        (title === 'Profile' ? 'profile-link' : '')
      }
      onClick={(e) =>
        (title === 'Create' && toggleCreatePost()) ||
        (title === 'Notifications' &&
          (filterNotifications(),
          updateNotifications(userContext?.user._id!),
          toggleNotifications(),
          e.stopPropagation(),
          e.preventDefault()))
      }
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
