import { NavigationLink } from './NavigationLink';
import { Link } from 'react-router-dom';
import { navData } from './navData';
import menu from './images/menu.png';
import instagram from './images/instagram-text-icon.png';
import instagramMobile from './images/insta-icon-mobile.png';
import './navigation.css';
import { useState } from 'react';
import { FooterMenu } from './FooterMenu';
import { CreatePost } from './CreatePost';

export const NavigationBar = () => {
  const [toggleMore, setToggleMore] = useState(false);
  const [toggleCreatePost, setToggleCreatePost] = useState(false);

  return (
    <nav className="main-navigation">
      <div className="header-nav">
        <section>
          <Link className="logo-desktop" to="/">
            <img
              src={instagram}
              alt="instagram-logo"
              style={{ maxWidth: '160px', padding: '10px' }}
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
              return (
                <NavigationLink
                  key={title}
                  title={title}
                  url={url}
                  link={link}
                  toggleCreatePost={() =>
                    setToggleCreatePost(!toggleCreatePost)
                  }
                />
              );
            })}
          </ul>
        </section>
      </div>

      <section
        className="footer-nav"
        style={{ position: 'relative' }}
        onClick={() => setToggleMore(!toggleMore)}
      >
        <div className="flex items-center gap-8">
          <img src={menu} alt="menu" />
          <h3>More</h3>
        </div>
        <FooterMenu toggleMore={toggleMore} />
      </section>
      <CreatePost {...{ toggleCreatePost, setToggleCreatePost }} />
    </nav>
  );
};
