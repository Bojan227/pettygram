import useUserContext from '../../hooks/useUserContext';
import { Link } from 'react-router-dom';

export default function ProfileCard() {
  const userContext = useUserContext();

  return (
    <div className="profile-feed-card">
      <div className="banner"></div>
      <div className="info-section">
        <Link to={`profile/${userContext?.user._id}`}>
          <h1>{userContext?.user.username}</h1>
        </Link>
        <img src={userContext?.user.imageUrl} className="info-profile-img" />
      </div>
    </div>
  );
}
