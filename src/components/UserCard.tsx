import { Link } from 'react-router-dom';
import { useFollow } from '../hooks/useFollow';
import useUserContext from '../hooks/useUserContext';
import { FollowButton } from './buttons/FollowButton';
import { MouseEvent } from 'react';
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
  const { changeFollowStatus } = useFollow();
  const userContext = useUserContext();

  return (
    <div className="users-container-profile" key={_id}>
      <Link to={`/profile/${_id}`}>
        <div className="flex items-center gap-1">
          <img src={imageUrl} />
          <h4>{firstName}</h4>
          <h4>{lastName}</h4>
        </div>
      </Link>
      {userContext?.user._id === _id ? null : (
        <FollowButton
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            changeFollowStatus(_id!);
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
