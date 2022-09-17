import { NavigationLink } from './NavigationLink';
import { navData } from './navData';
import menu from './images/menu.png';
import instagram from './images/instagram-text-icon.png';
import './navigation.css';

export const NavigationBar = () => {
  return (
    <nav className="main-navigation">
      <div className="header-nav">
        <section style={{ width: '100%' }}>
          <img
            src={instagram}
            alt="instagram-logo"
            style={{ maxWidth: '120px', padding: '10px' }}
          />
        </section>
        <section>
          <ul className="links-section">
            {navData.map((data) => {
              const { title, url, link } = data;
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
