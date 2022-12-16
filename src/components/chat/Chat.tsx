import { useState, useEffect } from 'react';
import { UserType } from '../../context/userContext';
import TextField from '../TextField';
import useUserContext from '../../hooks/useUserContext';
import { v4 as uuidv4 } from 'uuid';
import { useChatData } from '../../context/chatDataContext';
import { useAddMessage } from '../../context/chatDataContext';
import useGetChatHistory from '../../hooks/useGetChatHistory';
import useCreateMessage from '../../hooks/useCreateMessage';
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
  const [currentMessage, setCurrentMessage] = useState('');
  const userContext = useUserContext();
  const { isLoading, error } = useGetChatHistory(selectedUser);
  const { createMessage, errorMessage } = useCreateMessage();

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

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        message: currentMessage,
        receiverId: selectedUser?._id,
        senderId: userContext?.user?._id,
        members: [userContext?.user?._id, selectedUser?._id],
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      await createMessage(messageData);
      addMessage(messageData);
      setCurrentMessage('');
    }
  };

  if (isLoading) return <h1>Loading.....</h1>;

  return (
    <>
      {selectedUser ? (
        <div className={`chat ${selectedUser._id ? 'activated' : ''} `}>
          

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
          <div className="send-container">
            <TextField
              className="chat-input"
              value={currentMessage}
              onChange={(currentMessage) => setCurrentMessage(currentMessage)}
            />
            {currentMessage ? (
              <button className="send-btn" onClick={sendMessage}>
                Send
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <div className="empty-chat">Your messages</div>
      )}
    </>
  );
}
