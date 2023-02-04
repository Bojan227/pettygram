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
import { socket } from '../../constants/socket';
import LoadingSpinner from '../LoadingSpinner';

export default function Chat({
  selectedUser,
}: {
  selectedUser: UserType | undefined;
}) {
  const chatData = useChatData();
  const addMessage = useAddMessage();
  const { isLoading, error } = useGetChatHistory(selectedUser);

  useEffect(() => {
    socket.off('notification_message');
    socket.on('receive_message', (data: ChatType) => {
      addMessage(data);
    });
    return () => {
      socket.off('receive_message');
    };
  }, [socket, selectedUser?._id]);

  if (isLoading) return <LoadingSpinner />;

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
