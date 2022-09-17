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
    <li>
      <img src={url} alt="img" />
      <Link to={link}>
        <h3>{title}</h3>
      </Link>
    </li>
  );
};
