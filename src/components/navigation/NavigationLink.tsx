import { Link } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

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
      to={link}
      className={
        (title === 'Notifications' ? 'notification-link' : '') ||
        (title === 'Profile' ? 'profile-link' : '')
      }
      onClick={() => title === 'Create' && toggleCreatePost()}
    >
      <li>
        <img
          src={`${url === 'profile' ? userContext?.user.imageUrl : url}`}
          alt="img"
        />

        <h3>{title}</h3>
      </li>
    </Link>
  );
};
