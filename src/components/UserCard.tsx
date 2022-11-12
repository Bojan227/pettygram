import { Link } from 'react-router-dom';
import { useFollow } from '../hooks/useFollow';

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

  return (
    <div className="users-container" key={_id}>
      <Link to={`/profile/${_id}`}>
        <div className="flex items-center gap-1">
          <img src={imageUrl} className="w-14 h-20" />
          <h4>{firstName}</h4>
          <h4>{lastName}</h4>
        </div>
      </Link>
      <button onClick={() => changeFollowStatus(_id!)}>Follow</button>
    </div>
  );
};
