import { NavigationLink } from './NavigationLink';
import { Link } from 'react-router-dom';
import { navData } from './navData';
import menu from './images/menu.png';
import instagram from './images/instagram-text-icon.png';
import instagramMobile from './images/insta-icon-mobile.png';
import './navigation.css';
import useUserContenxt from '../../hooks/useUserContext';

export const NavigationBar = () => {
  const userContext = useUserContenxt();

  return (
    <nav className="main-navigation">
      <div className="header-nav">
        <section>
          <Link className="logo-desktop" to="/">
            <img
              src={instagram}
              alt="instagram-logo"
              style={{ maxWidth: '120px', padding: '10px' }}
            />
          </Link>
          <Link className="logo-mobile" to="/">
            <img
              src={instagramMobile}
              alt="instagram-logo"
              style={{ maxWidth: '120px', padding: '10px' }}
            />
          </Link>
        </section>
        <section>
          <ul className="links-section">
            {navData.map((data) => {
              const { title, url, link } = data;
              if (title === 'Profile') {
                return (
                  <NavigationLink
                    key={title}
                    title={title}
                    url={userContext?.user.imageUrl}
                    link={link}
                  />
                );
              }

              return (
                <NavigationLink
                  key={title}
                  title={title}
                  url={url}
                  link={link}
                />
              );
            })}
          </ul>
        </section>
      </div>

      <section className="footer-nav">
        <img src={menu} alt="menu" />
        <h3>More</h3>
      </section>
    </nav>
  );
};
