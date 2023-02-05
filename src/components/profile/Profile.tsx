import { ProfileCard } from './ProfileCard';
import './profile.css';
import { ProfileNav } from './ProfileNav';
import { Outlet } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export const Profile = () => {
  const refToTop = useRef<HTMLInputElement>(null);
  useEffect(() => {
    refToTop.current && refToTop.current.scrollIntoView({ behavior: 'smooth' });
  });
  return (
    <div ref={refToTop} className="profile-container">
      <ProfileCard />
      <ProfileNav />
      <Outlet />
    </div>
  );
};
