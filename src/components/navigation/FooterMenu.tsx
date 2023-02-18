import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useUserContext from '../../hooks/useUserContext';
import { MoonIcon } from '@heroicons/react/20/solid';
import { useToggleMode } from '../../context/themeContext';

export function FooterMenu({
  toggleMore,
}: {
  toggleMore?: boolean;
}): JSX.Element {
  const { logout } = useLogout();
  const userContext = useUserContext();
  const toggleMode = useToggleMode();

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
      <div onClick={toggleMode}>
        <h4>Switch appearance</h4>
        <MoonIcon width="34px" height="34px" />
      </div>
    </div>
  );
}
