import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useUserContext from '../../hooks/useUserContext';
type FooterMenuProps = { toggleMore?: boolean };

export function FooterMenu({ toggleMore }: FooterMenuProps): JSX.Element {
  const { logout } = useLogout();
  const userContext = useUserContext();
  return (
    <div
      className="footer-menu-section"
      style={{ display: `${toggleMore ? 'flex' : ''}` }}
    >
      <Link to="/" onClick={logout}>
        <h4>Logout</h4>
      </Link>
      <Link to={`profile/${userContext?.user._id}`}>
        <h4>Profile</h4>
      </Link>
    </div>
  );
}
