import { Link } from 'react-router-dom';
import { useFollow } from '../hooks/useFollow';
import useUserContext from '../hooks/useUserContext';
import { FollowButton } from './buttons/FollowButton';
import { MouseEvent } from 'react';
import { socket } from '../constants/socket';
interface UserCardProps {
  _id?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  imageUrl?: string | undefined;
}

export const UserCard = ({
  _id,
  firstName,
  lastName,
  imageUrl,
}: UserCardProps) => {
  const { changeFollowStatus, isLoading } = useFollow();
  const userContext = useUserContext();
  const isFollowed = userContext?.user?.following?.find(
    (user) => user?._id === _id
  );

  return (
    <div className="users-container-profile" key={_id}>
      <Link to={`/profile/${_id}`}>
        <div className="flex items-center gap-1">
          <img src={imageUrl} />
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
      </Link>
      {userContext?.user._id === _id ? null : (
        <FollowButton
          {...{ isLoading }}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            changeFollowStatus(_id!);
            socket.emit('send_notification', {
              senderId: userContext?.user._id,
              action: 'follow',
              receiverId: _id,
              message: `${
                isFollowed
                  ? 'is not following you anymore!'
                  : 'started following you!'
              }`,
            });
          }}
        >
          {userContext?.user?.following?.find(
            (userToFollow) => userToFollow?._id === _id!
          )
            ? 'Unfollow'
            : 'Follow'}
        </FollowButton>
      )}
    </div>
  );
};
