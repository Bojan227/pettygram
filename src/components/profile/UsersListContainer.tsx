import { UserCard } from '../UserCard';
import { UserType } from '../../context/userContext';

export const UsersListContainer = ({
  users,
  closeModal,
  title,
}: {
  users: (UserType | undefined)[] | undefined;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) => {
  return (
    <div onClick={() => closeModal(false)} className="users-container-list">
      <div className="users-list-content">
        <header>
          <h1>{title}</h1>
          <h1>X</h1>
        </header>

        {users?.map((user) => (
          <UserCard key={user?._id} {...user} />
        ))}
      </div>
    </div>
  );
};
