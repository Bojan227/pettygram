import { Link } from 'react-router-dom';
import instagram from './images/instagram-text-icon.png';
import instagramMobile from './images/insta-icon-mobile.png';

export default function LogoContainer() {
  return (
    <section>
      <Link className="logo-desktop" to="/">
        <img
          src={instagram}
          alt="instagram-logo"
          style={{ maxWidth: '160px' }}
        />
      </Link>
      <Link className="logo-mobile" to="/">
        <img
          src={instagramMobile}
          alt="instagram-logo"
          style={{ maxWidth: '120px' }}
        />
      </Link>
    </section>
  );
}
