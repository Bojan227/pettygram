import { useState } from 'react';
import { Link } from 'react-router-dom';

const navData = [
  {
    label: 'POSTS',
    href: '/profile',
    component: PostsContainer,
  },
  { label: 'SAVED', href: 'saved', component: Saved },
  { label: 'TAGGED', href: 'tagged', component: Tagged },
];

function PostsContainer() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

function Saved() {
  return (
    <div>
      <h1>Saved</h1>
    </div>
  );
}

function Tagged() {
  return (
    <div>
      <h1>Tagged</h1>
    </div>
  );
}

export const ProfileNav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const Wrapp = navData[selectedIndex].component as React.ElementType;
  return (
    <div className="profile-nav">
      {navData.map((data, i) => {
        const { label, href } = data;

        return (
          <>
            <Link
              key={label}
              to={href}
              onClick={() => setSelectedIndex(i)}
              className={selectedIndex === i ? 'active' : ''}
            >
              <p>{label}</p>
            </Link>
            {/* <Wrapp /> */}
          </>
        );
      })}
    </div>
  );
};
