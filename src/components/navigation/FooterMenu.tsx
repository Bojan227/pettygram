import { Link } from 'react-router-dom';

type FooterMenuProps = { toggleMore?: boolean };

export function FooterMenu({ toggleMore }: FooterMenuProps): JSX.Element {
  return (
    <div
      className="footer-menu-section"
      style={{ display: `${toggleMore ? 'flex' : ''}` }}
    >
      <Link to="/">
        <h4>Logout</h4>
      </Link>
      <Link to="profile">
        <h4>Profile</h4>
      </Link>
    </div>
  );
}
