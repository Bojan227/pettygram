import { NavigationLink } from './NavigationLink';
import { NavigationBarProps } from './types';
import { navData } from './navData';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';
import LogoContainer from './LogoContainer';
import './navigation.css';
import { useState } from 'react';
import { FooterMenu } from './FooterMenu';
import { CreatePost } from './CreatePost';
import NotificationsContainer from '../notifications/NotificationsContainer';
import { useToggleMode } from '../../context/themeContext';

export const NavigationBar = ({
  toggleNotifications,
  setToggleNotifications,
}: NavigationBarProps) => {
  const [toggleMore, setToggleMore] = useState(false);
  const [toggleCreatePost, setToggleCreatePost] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const toggleMode = useToggleMode();

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
            {navData.map(({ title, url, link, SvgIcon }, i) => (
              <NavigationLink
                {...{
                  title,
                  url,
                  link,
                  setSelectedIndex,
                  index: i,
                  selectedIndex,
                  SvgIcon,
                }}
                key={title}
                toggleCreatePost={() => setToggleCreatePost(!toggleCreatePost)}
                toggleNotifications={() =>
                  setToggleNotifications(!toggleNotifications)
                }
              />
            ))}
            <MoonIcon onClick={toggleMode} width="32px" height="32px" />
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
          <Bars3Icon width="32px" height="32px" />
          <h3>More</h3>
        </div>
        <FooterMenu toggleMore={toggleMore} />
      </section>
      <CreatePost {...{ toggleCreatePost, setToggleCreatePost }} />
      <NotificationsContainer {...{ toggleNotifications }} />
    </nav>
  );
};
