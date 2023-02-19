import { Link } from 'react-router-dom';
import instagram from './images/instagram-text-icon.png';
import instagramMobile from './images/insta-icon-mobile.png';
import { InstaLogo, InstaWordmark } from '../feed/SvgsContainer';

export default function LogoContainer() {
  return (
    <section>
      <Link className="logo-desktop" to="/">
        <InstaWordmark />
      </Link>
      <Link className="logo-mobile" to="/">
        <InstaLogo />
      </Link>
    </section>
  );
}
