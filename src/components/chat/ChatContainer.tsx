import useUserContext from '../../hooks/useUserContext';
import { UserType } from '../../context/userContext';
import { useState } from 'react';
import Chat from './Chat';
import './chat.css';
import ChatHeader from './ChatHeader';
import ChatUser from './ChatUser';
import { v4 as uuidv4 } from 'uuid';
import useGetUsersById from '../../hooks/useGetUsersById';

export default function ChatContainer() {
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();
  const userContext = useUserContext();
  const { users } = useGetUsersById();

  return (
    <div className="chat-container">
      <div>
        <div className="chat-header">{userContext?.user?.username}</div>
        <div className={`chat-users ${selectedUser?._id ? 'disabled' : ''}`}>
          {users?.map((user) => (
            <ChatUser
              key={uuidv4()}
              {...{ ...user, selectedUser }}
              setSelectedUser={() => setSelectedUser(user)}
            />
          ))}
        </div>
        <ChatHeader {...{ selectedUser, setSelectedUser }} />
        {selectedUser && <Chat {...{ selectedUser }} />}
      </div>
    </div>
  );
}
