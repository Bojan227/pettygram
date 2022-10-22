import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

type FooterMenuProps = { toggleMore?: boolean };

export function FooterMenu({ toggleMore }: FooterMenuProps): JSX.Element {
  const { logout } = useLogout();

  return (
    <div
      className="footer-menu-section"
      style={{ display: `${toggleMore ? 'flex' : ''}` }}
    >
      <Link to="/" onClick={logout}>
        <h4>Logout</h4>
      </Link>
      <Link to="profile">
        <h4>Profile</h4>
      </Link>
    </div>
  );
}
