import { ProfileCard } from './ProfileCard';
import './profile.css';
import { ProfileNav } from './ProfileNav';
import { Outlet, useParams } from 'react-router-dom';

export const Profile = () => {
  return (
    <div className="profile-container">
      <ProfileCard />
      <ProfileNav />
      <Outlet />
    </div>
  );
};
