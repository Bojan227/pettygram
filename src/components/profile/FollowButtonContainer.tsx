import { FollowButton } from '../buttons/FollowButton';
import { socket } from '../../constants/socket';
import useUserContext from '../../hooks/useUserContext';
import { UserType } from '../../context/userContext';
import { useFollow } from '../../hooks/useFollow';
import { useParams } from 'react-router-dom';

export default function FollowButtonContainer({
  userInfo,
  setUserInfo,
}: {
  userInfo: UserType | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}) {
  const userContext = useUserContext();
  const isFollowed = userContext?.user?.following?.find(
    (user) => user?._id === userInfo?._id
  );
  const { changeFollowStatus } = useFollow();
  const { userId } = useParams();

  const sendNotification = () => {
    socket.emit('send_notification', {
      senderId: userContext?.user._id,
      action: 'follow',
      receiverId: userInfo?._id,
      message: `${
        isFollowed ? 'is not following you anymore!' : 'started following you!'
      }`,
    });
  };

  const setUserFollowers = () => {
    setUserInfo((prevInfo) => {
      return {
        ...prevInfo,
        followers: prevInfo?.followers?.find(
          (userToFollow) => userToFollow?._id === userContext?.user._id!
        )
          ? prevInfo.followers.filter(
              (userToFollow) => userToFollow?._id !== userContext?.user._id
            )
          : [...prevInfo?.followers!, userContext?.user],
      };
    });
  };

  return (
    <FollowButton
      onClick={() => {
        changeFollowStatus(userInfo?._id!);
        setUserFollowers();
        sendNotification();
      }}
    >
      {userContext?.user?.following?.find(
        (userToFollow) => userToFollow?._id === userId!
      )
        ? 'Unfollow'
        : 'Follow'}
    </FollowButton>
  );
}
