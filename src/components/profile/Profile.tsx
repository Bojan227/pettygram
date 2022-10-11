import { ProfileCard } from './ProfileCard';
import './profile.css';
import { ProfileNav } from './ProfileNav';
import { Outlet, useParams } from 'react-router-dom';
import useUserContenxt from '../../hooks/useUserContext';

export const Profile = () => {
  const userContext = useUserContenxt();
  return (
    <div className="profile-container">
      <ProfileCard
        url={userContext?.user.imageUrl || undefined}
        user={{
          username: userContext?.user.username,
          firstName: userContext?.user.firstName,
          lastName: userContext?.user.lastName,
          imageUrl: userContext?.user.imageUrl,
        }}
        info={{ posts: 0, followers: 74, following: 166 }}
      />
      <ProfileNav />

      <Outlet />
    </div>
  );
};
