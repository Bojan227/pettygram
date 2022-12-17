import { useEffect } from 'react';
import { UserType } from '../../context/userContext';
import SendMessage from './SendMessage';
import useUserContext from '../../hooks/useUserContext';
import { v4 as uuidv4 } from 'uuid';
import { useChatData } from '../../context/chatDataContext';
import { useAddMessage } from '../../context/chatDataContext';
import useGetChatHistory from '../../hooks/useGetChatHistory';
import Message from './Message';
import { ChatType } from '../../context/chatDataContext';

export default function Chat({
  selectedUser,
  socket,
}: {
  selectedUser: UserType | undefined;
  socket: any;
}) {
  const chatData = useChatData();
  const addMessage = useAddMessage();
  const userContext = useUserContext();
  const { isLoading, error } = useGetChatHistory(selectedUser);

  useEffect(() => {
    if (userContext?.user._id) {
      socket.emit('add_user', { userId: userContext?.user?._id });
    }
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data: ChatType) => {
      addMessage(data);
    });
    return () => {
      socket.off('receive_message');
    };
  }, [socket, selectedUser?._id]);

  if (isLoading) return <h1>Loading.....</h1>;

  return selectedUser ? (
    <div className={`chat ${selectedUser._id ? 'activated' : ''} `}>
      {error && <h1>{error}</h1>}
      <div className="messages">
        {chatData?.map(({ message, senderId }, i) => {
          return (
            <Message
              key={uuidv4()}
              {...{ selectedUser, message, senderId, index: i }}
            />
          );
        })}
      </div>
      <SendMessage {...{ selectedUser, socket }} />
    </div>
  ) : (
    <div className="empty-chat">Your messages</div>
  );
}
