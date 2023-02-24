import { Link } from 'react-router-dom';
import { PettyLogo } from '../feed/SvgsContainer';

export default function LogoContainer() {
  return (
    <section>
      <Link className="logo-desktop" to="/">
        <h1>Pettygram</h1>
      </Link>
      <Link className="logo-mobile" to="/">
        <PettyLogo />
      </Link>
    </section>
  );
}
