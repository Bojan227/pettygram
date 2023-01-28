import { PostCard } from './PostCard';
import { useEffect } from 'react';
import { useGetUsers } from '../../hooks/useGetUsers';
import useUserContext from '../../hooks/useUserContext';
import './feed.css';
import { FeedContainerProps } from './types/feedTypes';
import { UserCard } from '../UserCard';
import { socket } from '../../constants/socket';
import { usePostsStore } from '../../store/postsStore';
import { useGetPosts } from '../../hooks/useGetPosts';

export const FeedContainer = () => {
  const { getUsers, isLoading, users } = useGetUsers();
  const userContext = useUserContext();
  const { posts, addPost } = usePostsStore();
  const { isLoadingState, error } = useGetPosts();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (userContext?.user._id) {
      socket.emit('add_user', { userId: userContext?.user?._id });
    }
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user._id !== userContext?.user._id &&
      !userContext?.user?.following?.find(
        (userToFollow) => userToFollow?._id === user._id
      )
  );

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isLoadingState) return <h1>Loading....</h1>;

  return (
    <main className="feed-container">
      {error && <h1>{error}</h1>}
      {posts?.map((post, i) => (
        <PostCard key={i} {...post} setPosts={addPost} />
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
