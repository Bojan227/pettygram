import { ProfileCard } from './ProfileCard';
import './profile.css';
import { ProfileNav } from './ProfileNav';
import { Outlet, useParams } from 'react-router-dom';

export const Profile = () => {
  return (
    <div className="profile-container">
      <ProfileCard info={{ posts: 0, followers: 74, following: 166 }} />
      <ProfileNav />

      <Outlet />
    </div>
  );
};
