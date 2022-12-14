import { useState, useEffect } from 'react';
import { UserType } from '../../context/userContext';
import TextField from '../TextField';
import useUserContext from '../../hooks/useUserContext';
import { v4 as uuidv4 } from 'uuid';
import { useChatData } from '../../context/chatDataContext';
import { useAddMessage } from '../../context/chatDataContext';
import useGetChatHistory from '../../hooks/useGetChatHistory';
import Message from './Message';

export interface ChatType {
  message: string;
  senderId: string | undefined;
  time: string;
  receiverId: string | undefined;
  members: (string | undefined)[];
}

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

  useEffect(() => {
    socket.emit('add_user', { userId: userContext?.user?._id });
  }, []);

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

      await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            document.cookie
              .split(';')
              .map((value) => value.trim())
              .filter((value) => value.split('=')[0] === 'token')
              .map((value) => value.split('=')[1])[0]
          }`,
        },
        body: JSON.stringify(messageData),
      });
      addMessage(messageData);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    const addNewMessage = (data: ChatType) => {
      addMessage(data);
    };

    socket.on('receive_message', addNewMessage);

    return () => socket.off('receive_message', addNewMessage);
  }, []);

  if (isLoading) return <h1>Loading.....</h1>;

  return (
    <>
      {selectedUser ? (
        <div className="chat">
          <div className="messages">
            {chatData &&
              chatData?.map(({ message, senderId }, i) => {
                return (
                  <Message
                    key={uuidv4()}
                    {...{ selectedUser, message, senderId }}
                  />
                );
              })}
          </div>
          <TextField
            className="chat"
            value={currentMessage}
            onChange={(currentMessage) => setCurrentMessage(currentMessage)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <div className="empty-chat">Your messages</div>
      )}
    </>
  );
}
