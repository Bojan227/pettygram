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
        <div className="info-followers">
          <h4>{info.posts} posts</h4>
          <h4>{info.followers} followers</h4>
          <h4>{info.following} following</h4>
        </div>
        <h2>
          {userContext?.user.firstName + ' ' + userContext?.user.lastName}
        </h2>
      </div>
    </div>
  );
};
