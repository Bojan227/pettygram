import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserType } from '../../context/userContext';
import useUserContext from '../../hooks/useUserContext';
import { useGetData } from '../../hooks/useGetData';
import { UsersListContainer } from './UsersListContainer';
import { Edit } from '../feed/SvgsContainer';
import { Post } from '../feed/types/feedTypes';
import default_insta from '../../assets/default_insta.jpg';
import FollowButtonContainer from './FollowButtonContainer';
import { url } from '../../constants/api';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import Logout from '../../hooks/useLogout';

export const ProfileCard = () => {
  const [userInfo, setUserInfo] = useState<UserType>();
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [showFollowers, setShowFollowers] = useState<boolean>(false);
  const [showFollowing, setShowFollowing] = useState<boolean>(false);
  const userContext = useUserContext();

  const { userId } = useParams();
  const { getData } = useGetData();
  const { logout } = Logout();

  useEffect(() => {
    getData({
      url: `${url}/user/${userId}`,
      setState: setUserInfo,
    });
    getData({
      url: `${url}/posts/${userId}`,
      setState: setUserPosts,
    });
  }, [userId, userContext?.user.following?.length]);

  return (
    <div className="profile-card">
      {showFollowers && (
        <UsersListContainer
          title={'Followers'}
          users={userInfo?.followers}
          closeModal={setShowFollowers}
        />
      )}
      {showFollowing && (
        <UsersListContainer
          title={'Following'}
          users={userInfo?.following}
          closeModal={setShowFollowing}
        />
      )}

      <img src={userInfo?.imageUrl || default_insta} alt="img" />
      <div className="info-profile">
        <div className="info-followers">
          <h4>
            {userPosts?.length} {userPosts?.length === 1 ? 'post' : 'posts'}
          </h4>
          <h4 onClick={() => setShowFollowers(true)}>
            {userInfo?.followers?.length}{' '}
            {userInfo?.followers?.length === 1 ? 'follower' : 'followers'}
          </h4>
          <h4 onClick={() => setShowFollowing(true)}>
            {userInfo?.following?.length} following
          </h4>
          {userContext?.user._id === userInfo?._id && (
            <div>
              <Link to={`/edit`}>
                <Edit />
              </Link>
              <ArrowLeftOnRectangleIcon onClick={logout} />
            </div>
          )}
        </div>
        <h2>{userInfo?.firstName + ' ' + userInfo?.lastName}</h2>
        {userContext?.user._id === userId ? (
          ''
        ) : (
          <FollowButtonContainer {...{ setUserInfo, userInfo }} />
        )}
      </div>
    </div>
  );
};
