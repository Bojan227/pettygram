import { UserType } from '../../context/userContext';

export default function ChatHeader({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: UserType | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}) {
  return (
    <div className="private-chat-header">
      {selectedUser && (
        <>
          <button
            onClick={() => {
              setSelectedUser(undefined);
            }}
            className={selectedUser._id ? 'activated' : ''}
          >
            &#8592;
          </button>
          <img src={selectedUser?.imageUrl} />
          <h1>{selectedUser?.firstName}</h1>
          <h1>{selectedUser?.lastName}</h1>
        </>
      )}
    </div>
  );
}
