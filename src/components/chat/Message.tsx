import { UserType } from '../../context/userContext';
import useUserContext from '../../hooks/useUserContext';

type MessageProps = {
  message: string | undefined;
  senderId: string | undefined;
  selectedUser: UserType | undefined;
};

export default function Message({
  message,
  senderId,
  selectedUser,
}: MessageProps) {
  const userContext = useUserContext();
  return (
    <div
      className={`chat-box ${
        userContext?.user._id === senderId ? 'user' : 'guest'
      }`}
    >
      <h3>{message}</h3>
      <p>
        {userContext?.user._id === senderId
          ? userContext?.user.username
          : selectedUser?.username}
      </p>
    </div>
  );
}
