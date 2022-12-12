import { useState, useEffect } from 'react';
import { UserType } from '../../context/userContext';
import TextField from '../TextField';
import useUserContext from '../../hooks/useUserContext';
import { v4 as uuidv4 } from 'uuid';

interface ChatType {
  message: string;
  author: string;
  time: string;
  room: string;
}

export default function Chat({
  selectedUser,
  socket,
}: {
  selectedUser: UserType | undefined;
  socket: any;
}) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatData, setChatData] = useState<ChatType[] | undefined>([]);
  const userContext = useUserContext();

  useEffect(() => {
    socket.on('receive_message', (data: ChatType) => {
      setChatData((prev) => [...prev!, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room: '24',
        message: currentMessage,
        author: userContext?.user?.username!,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setChatData((prevData) => [...prevData!, messageData]);
      setCurrentMessage('');
    }
  };

  return (
    <>
      {selectedUser ? (
        <div className="chat">
          <div className="messages">
            {chatData?.map(({ message }, i) => {
              return <h1 key={uuidv4()}>{message}</h1>;
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
