import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from '../../context/userContext';
import { Post } from '../../hooks/useGetPosts';
import { useFollow } from '../../hooks/useFollow';
import useUserContext from '../../hooks/useUserContext';
import { useGetData } from '../../hooks/useGetData';
import { UsersListContainer } from './UsersListContainer';

export const ProfileCard = () => {
  const [userInfo, setUserInfo] = useState<UserType>();
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [showFollowers, setShowFollowers] = useState<boolean>(false);
  const [showFollowing, setShowFollowing] = useState<boolean>(false);

  const { userId } = useParams();
  const { changeFollowStatus } = useFollow();
  const { getData } = useGetData();
  const userContext = useUserContext();

  useEffect(() => {
    getData({
      url: `http://localhost:4000/user/${userId}`,
      setState: setUserInfo,
    });
    getData({
      url: `http://localhost:4000/posts/${userId}`,
      setState: setUserPosts,
    });
  }, [userId, userContext?.user.following]);

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

      <img src={userInfo?.imageUrl} alt="img" />
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
        </div>
        <h2>{userInfo?.firstName + ' ' + userInfo?.lastName}</h2>
        {userContext?.user._id === userId ? (
          ''
        ) : (
          <button
            className="follow-btn"
            onClick={() => {
              changeFollowStatus(userInfo?._id!);
              setUserInfo((prevInfo) => {
                return {
                  ...prevInfo,
                  followers: prevInfo?.followers?.find(
                    (userToFollow) =>
                      userToFollow?._id === userContext?.user._id!
                  )
                    ? prevInfo.followers.filter(
                        (userToFollow) =>
                          userToFollow?._id !== userContext?.user._id
                      )
                    : [...prevInfo?.followers!, userContext?.user],
                };
              });
            }}
          >
            {userContext?.user?.following?.find(
              (userToFollow) => userToFollow?._id === userId!
            )
              ? 'Unfollow'
              : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
};
