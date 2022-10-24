import { useState } from 'react';
import { Link } from 'react-router-dom';

const navData = [
  {
    label: 'POSTS',
    href: '/profile',
  },
  { label: 'SAVED', href: 'saved' },
  { label: 'TAGGED', href: 'tagged' },
];

export const ProfileNav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="profile-nav">
      {navData.map((data, i) => {
        const { label, href } = data;

        return (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={selectedIndex === i ? 'active' : ''}
          >
            <Link to={href}>
              <p>{label}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
