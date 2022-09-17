import { Link } from 'react-router-dom';

type NavigationLinkProps = {
  title: string;
  link: string;
  url: string;
};

export const NavigationLink = ({
  title,
  link,
  url,
}: NavigationLinkProps): JSX.Element => {
  return (
    <Link
      to={link}
      className={title === 'Notifications' ? 'notification-link' : ''}
    >
      <li>
        <img src={url} alt="img" />
        <h3>{title}</h3>
      </li>
    </Link>
  );
};
