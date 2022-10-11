import { ProfileNav } from './ProfileNav';

type ProfileCardProps = {
  url: string | undefined;
  user: {
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    imageUrl?: string | undefined;
  };
  info: {
    posts: number;
    followers: number;
    following: number;
  };
};

export const ProfileCard = ({ url, user, info }: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <img src={url} alt="img" style={{ width: '75px' }} />
      <div className="info-profile">
        <div style={{ justifyContent: 'space-between' }}>
          <h1>{user.username}</h1>
          <button>Edit Profile</button>
        </div>

        <div className="info-followers">
          <h3>{info.posts} posts</h3>
          <h3>{info.followers} followers</h3>
          <h3>{info.following} following</h3>
        </div>
        <h2>{user.firstName + ' ' + user.lastName}</h2>
      </div>
    </div>
  );
};
