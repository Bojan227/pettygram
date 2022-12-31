import { PostCard } from './PostCard';
import { useEffect } from 'react';
import { useGetUsers } from '../../hooks/useGetUsers';
import useUserContext from '../../hooks/useUserContext';
import './feed.css';
import { FeedContainerProps } from './types/feedTypes';
import { UserCard } from '../UserCard';
import { socket } from '../../constants/socket';
import { ChatType } from '../../context/chatDataContext';
import { useAddNotificationMessage } from '../../context/notificationsMessagesContext';
import { useNewMessages } from '../../context/notificationsMessagesContext';

export const FeedContainer = ({
  posts,
  setPosts,
  error,
}: FeedContainerProps) => {
  const { getUsers, isLoading, users } = useGetUsers();
  const userContext = useUserContext();
  const addNotificationMessage = useAddNotificationMessage();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (userContext?.user._id) {
      socket.emit('add_user', { userId: userContext?.user?._id });
    }
  }, []);

  useEffect(() => {
    socket.on('notification_message', (data: ChatType) => {
      console.log(data);
      addNotificationMessage(data);
    });
    return () => {
      socket.off('notification_message');
    };
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user._id !== userContext?.user._id &&
      !userContext?.user?.following?.find(
        (userToFollow) => userToFollow?._id === user._id
      )
  );

  return (
    <main className="feed-container">
      {posts?.map((post, i) => (
        <PostCard key={i} {...post} setPosts={setPosts} />
      ))}
      {filteredUsers?.length === 0 ? null : (
        <div className="suggested-users">
          <div className="suggested-header">
            <h1>Discover People</h1>
          </div>
          {filteredUsers?.map(({ imageUrl, firstName, lastName, _id }) => (
            <UserCard key={_id} {...{ imageUrl, firstName, lastName, _id }} />
          ))}
        </div>
      )}
    </main>
  );
};
