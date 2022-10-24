import useUserContenxt from '../../hooks/useUserContext';

type ProfileCardProps = {
  info: {
    posts: number;
    followers: number;
    following: number;
  };
};

export const ProfileCard = ({ info }: ProfileCardProps) => {
  const userContext = useUserContenxt();

  return (
    <div className="profile-card">
      <img
        src={userContext?.user.imageUrl}
        alt="img"
        style={{ width: '75px' }}
      />
      <div className="info-profile">
        <div style={{ justifyContent: 'space-between' }}>
          <h1>{userContext?.user.username}</h1>
          <button>Edit Profile</button>
        </div>

        <div className="info-followers">
          <h3>{info.posts} posts</h3>
          <h3>{info.followers} followers</h3>
          <h3>{info.following} following</h3>
        </div>
        <h2>
          {userContext?.user.firstName + ' ' + userContext?.user.lastName}
        </h2>
      </div>
    </div>
  );
};
