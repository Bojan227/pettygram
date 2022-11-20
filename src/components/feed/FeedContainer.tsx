import { PostCard } from './PostCard';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useGetUsers } from '../../hooks/useGetUsers';
import useUserContext from '../../hooks/useUserContext';
import './feed.css';
import { Post } from '../../hooks/useGetPosts';
import { UserCard } from '../UserCard';

interface FeedContainerProps {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[] | undefined>>;
  error: string;
}

export const FeedContainer = ({
  posts,
  setPosts,
  error,
}: FeedContainerProps) => {
  const { getUsers, isLoading, users } = useGetUsers();
  const userContext = useUserContext();

  useEffect(() => {
    getUsers();
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
      {error && <h1>{error}</h1>}
      {posts?.map((post, i) => (
        <PostCard key={i} {...post} setPosts={setPosts} />
      ))}
      <div className="suggested-users">
        <div className="suggested-header">
          <h1>Discover People</h1>
        </div>
        {filteredUsers?.map(({ imageUrl, firstName, lastName, _id }) => (
          <UserCard key={_id} {...{ imageUrl, firstName, lastName, _id }} />
        ))}
      </div>
    </main>
  );
};
