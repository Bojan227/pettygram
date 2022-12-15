import { UserType } from '../../context/userContext';

export default function ChatHeader({
  selectedUser,
}: {
  selectedUser: UserType | undefined;
}) {
  return (
    <div className="private-chat-header">
      {selectedUser && (
        <>
          <img src={selectedUser?.imageUrl} />
          <h1>{selectedUser?.firstName}</h1>
          <h1>{selectedUser?.lastName}</h1>
        </>
      )}
    </div>
  );
}
