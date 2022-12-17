import TextField from '../TextField';
import { UserType } from '../../context/userContext';
import { useState } from 'react';
import useUserContext from '../../hooks/useUserContext';
import useCreateMessage from '../../hooks/useCreateMessage';
import { useAddMessage } from '../../context/chatDataContext';

export default function SendMessage({
  socket,
  selectedUser,
}: {
  socket: any;
  selectedUser: UserType;
}) {
  const [currentMessage, setCurrentMessage] = useState('');
  const { createMessage, errorMessage } = useCreateMessage();
  const userContext = useUserContext();
  const addMessage = useAddMessage();

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

  return (
    <div className="send-container">
      {errorMessage && <h1>{errorMessage}</h1>}
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
  );
}
