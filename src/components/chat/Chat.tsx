import { useState, useEffect } from 'react';
import { UserType } from '../../context/userContext';
import TextField from '../TextField';
import useUserContext from '../../hooks/useUserContext';
import { v4 as uuidv4 } from 'uuid';

interface ChatType {
  message: string;
  author: string | undefined;
  time: string;
  room: string;
  receiver: string | undefined;
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
    const getChat = async () => {
      const res = await fetch(
        `http://localhost:4000/chat?author=${userContext?.user._id}&receiver=${selectedUser?._id}`
      );
      const json = await res.json();

      setChatData(json);
    };
    if (selectedUser?._id) {
      getChat();
    }
  }, [selectedUser?._id]);

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
        receiver: selectedUser?._id,
        author: userContext?.user?._id,
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
