import { NavigationLink } from './NavigationLink';
import { Dispatch, SetStateAction } from 'react';
import { NavigationBarProps } from './types';
import { navData } from './navData';
import menu from './images/menu.png';
import LogoContainer from './LogoContainer';
import './navigation.css';
import { useState } from 'react';
import { FooterMenu } from './FooterMenu';
import { CreatePost } from './CreatePost';
import NotificationsContainer from '../notifications/NotificationsContainer';

export const NavigationBar = ({
  toggleNotifications,
  setToggleNotifications,
}: NavigationBarProps) => {
  const [toggleMore, setToggleMore] = useState(false);
  const [toggleCreatePost, setToggleCreatePost] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(selectedIndex);

  return (
    <nav
      className="main-navigation"
      onClick={() => {
        setToggleMore(false);
        setToggleNotifications(false);
      }}
    >
      <div className="header-nav">
        <LogoContainer />
        <section>
          <ul className="links-section">
            {navData.map(({ title, url, link }, i) => (
              <NavigationLink
                {...{
                  title,
                  url,
                  link,
                  setSelectedIndex,
                  index: i,
                  selectedIndex,
                }}
                key={title}
                toggleCreatePost={() => setToggleCreatePost(!toggleCreatePost)}
                toggleNotifications={() =>
                  setToggleNotifications(!toggleNotifications)
                }
              />
            ))}
          </ul>
        </section>
      </div>
      <section
        className="footer-nav"
        style={{ position: 'relative' }}
        onClick={(e) => {
          e.stopPropagation();
          setToggleMore(!toggleMore);
        }}
      >
        <div className="flex items-center gap-8">
          <img src={menu} alt="menu" />
          <h3>More</h3>
        </div>
        <FooterMenu toggleMore={toggleMore} />
      </section>
      <CreatePost {...{ toggleCreatePost, setToggleCreatePost }} />
      <NotificationsContainer {...{ toggleNotifications }} />
    </nav>
  );
};
