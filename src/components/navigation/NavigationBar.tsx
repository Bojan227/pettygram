import { NavigationLink } from './NavigationLink';
import { Dispatch, SetStateAction } from 'react';
import { Post } from '../feed/types/feedTypes';
import { navData } from './navData';
import menu from './images/menu.png';
import LogoContainer from './LogoContainer';
import './navigation.css';
import { useState } from 'react';
import { FooterMenu } from './FooterMenu';
import { CreatePost } from './CreatePost';

export const NavigationBar = ({
  setPosts,
}: {
  setPosts: Dispatch<SetStateAction<Post[] | undefined>>;
}) => {
  const [toggleMore, setToggleMore] = useState(false);
  const [toggleCreatePost, setToggleCreatePost] = useState(false);

  return (
    <nav className="main-navigation" onClick={() => setToggleMore(false)}>
      <div className="header-nav">
        <LogoContainer />
        <section>
          <ul className="links-section">
            {navData.map(({ title, url, link }) => (
              <NavigationLink
                {...{ title, url, link }}
                key={title}
                toggleCreatePost={() => setToggleCreatePost(!toggleCreatePost)}
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
      <CreatePost {...{ toggleCreatePost, setToggleCreatePost, setPosts }} />
    </nav>
  );
};
