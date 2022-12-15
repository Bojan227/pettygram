import useUserContext from '../../hooks/useUserContext';
import { UserType } from '../../context/userContext';
import { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
import Chat from './Chat';
import './chat.css';
import ChatHeader from './ChatHeader';
import ChatUser from './ChatUser';
import { v4 as uuidv4 } from 'uuid';

export default function ChatContainer() {
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();
  const socket: any = socketClient('http://localhost:4000/');
  const userContext = useUserContext();

  useEffect(() => {
    return () => socket.emit('remove_user', { userId: userContext?.user?._id });
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">{userContext?.user?.username}</div>
      <div className="chat-users">
        {userContext?.user?.following?.map((user) => (
          <ChatUser
            key={uuidv4()}
            {...{ ...user, selectedUser }}
            setSelectedUser={() => setSelectedUser(user)}
          />
        ))}
      </div>
      <ChatHeader {...{ selectedUser }} />
      {selectedUser && <Chat {...{ socket, selectedUser }} />}
    </div>
  );
}
