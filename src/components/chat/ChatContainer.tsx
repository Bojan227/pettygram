import useUserContext from '../../hooks/useUserContext';
import { UserType } from '../../context/userContext';
import { useState } from 'react';
import TextField from '../TextField';
import './chat.css';

export default function ChatContainer() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const userContext = useUserContext();

  console.log(userContext?.user.following);

  return (
    <div className="chat-container">
      <div className="chat-header">{userContext?.user.username}</div>
      <div className="chat-users">
        {userContext?.user?.following?.map((user, i) => {
          return (
            <div
              className="user-card"
              onClick={() => setSelectedUser(user)}
              key={i}
            >
              <img src={user?.imageUrl} />
              <p>{user?.firstName}</p>
              <p>{user?.lastName}</p>
            </div>
          );
        })}
      </div>
      <div className="private-chat-header">
        <img src={selectedUser?.imageUrl} />
        <h1>{selectedUser?.firstName}</h1>
        <h1>{selectedUser?.lastName}</h1>
      </div>
      {selectedUser ? (
        <div className="chat">
          <div className="messages">messages...</div>
          <TextField
            className="chat"
            value={currentMessage}
            onChange={(currentMessage) => setCurrentMessage(currentMessage)}
          />
        </div>
      ) : (
        <div className="empty-chat">Your messages</div>
      )}
    </div>
  );
}
