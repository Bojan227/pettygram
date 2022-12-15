import { ChatUserProps } from './types';

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
