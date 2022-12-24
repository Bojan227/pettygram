import { ChatUserProps } from './types';
import { socket } from '../../constants/socket';
import { useEffect, useState } from 'react';
import { OnlineUsersData } from './types';

export default function ChatUser({
  imageUrl,
  firstName,
  lastName,
  _id,
  setSelectedUser,
  selectedUser,
}: ChatUserProps) {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsersData[]>([]);
  console.log(onlineUsers);
  useEffect(() => {
    socket.emit('getOnlineUsers');
  }, [socket, selectedUser?._id]);

  useEffect(() => {
    socket.on('online-users', (data: OnlineUsersData[]) => {
      setOnlineUsers(data);
    });
    return () => {
      socket.off('online-users');
      socket.off('getOnlineusers');
    };
  }, [socket, selectedUser?._id]);

  return (
    <div
      className={`user-card ${
        selectedUser?.firstName === firstName && 'active'
      }`}
      onClick={setSelectedUser}
    >
      <img src={imageUrl} />
      <div>
        <div>
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>

        {onlineUsers.find(({ userId }) => userId === _id) ? (
          <div>
            <div className="green-circle"></div>
            <p>Active now</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
