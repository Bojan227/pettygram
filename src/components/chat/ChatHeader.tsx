import { UserType } from '../../context/userContext';
import useUserContext from '../../hooks/useUserContext';

export default function ChatHeader({
  selectedUser,
  setSelectedUser,
  socket,
}: {
  selectedUser: UserType | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  socket: any;
}) {
  const userContext = useUserContext();

  return (
    <div className="private-chat-header">
      {selectedUser && (
        <>
          <button
            onClick={() => {
              setSelectedUser(undefined);
              socket.emit('remove_user', { userId: userContext?.user?._id });
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
