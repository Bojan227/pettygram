import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../hooks/useGetUsers';

export const ProfileCard = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { userId } = useParams();

  console.log(userInfo);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(`http://localhost:4000/user/${userId}`);
      const json = await res.json();

      setUserInfo(json);
    };

    getUserInfo();
  }, [userId]);

  return (
    <div className="profile-card">
      <img src={userInfo?.imageUrl} alt="img" />
      <div className="info-profile">
        <div className="info-followers">
          {/* <h4>{info.posts} posts</h4> */}
          <h4>{userInfo?.followers.length} followers</h4>
          <h4>{userInfo?.following.length} following</h4>
        </div>
        <h2>{userInfo?.firstName + ' ' + userInfo?.lastName}</h2>
      </div>
    </div>
  );
};
