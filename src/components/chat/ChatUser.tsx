import { UserType } from '../../context/userContext';

interface ChatUserProps {
  imageUrl?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  setSelectedUser: () => void;
  selectedUser: UserType | undefined;
}

export default function ChatUser({
  imageUrl,
  firstName,
  lastName,
  setSelectedUser,
  selectedUser,
}: ChatUserProps) {
  return (
    <div
      className={`user-card ${
        selectedUser?.firstName === firstName && 'active'
      }`}
      onClick={setSelectedUser}
    >
      <img src={imageUrl} />
      <div>
        <p>{firstName}</p>
        <p>{lastName}</p>
      </div>
    </div>
  );
}
