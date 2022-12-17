import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

const navData = [
  {
    label: 'POSTS',
    href: 'profile',
  },
  { label: 'SAVED', href: 'saved' },
];

export const ProfileNav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { userId } = useParams();
  const userContext = useUserContext();

  const filterNavData =
    userId === userContext?.user._id ? navData : navData.slice(0, 1);

  return (
    <div className="profile-nav">
      {filterNavData.map((data, i) => {
        const { label, href } = data;

        return (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={selectedIndex === i ? 'active' : ''}
          >
            <Link to={href === 'profile' ? '' : href}>
              <p>{label}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
