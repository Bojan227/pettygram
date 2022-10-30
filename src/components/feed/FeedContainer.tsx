import { PostCard } from './PostCard';
import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useGetUsers } from '../../hooks/useGetUsers';
import useUserContenxt from '../../hooks/useUserContext';
import './feed.css';
import { Post } from '../../hooks/useGetPosts';

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
  const userContext = useUserContenxt();
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="feed-container">
      {error && <h1>{error}</h1>}
      {posts?.map((post, i) => {
        return <PostCard key={i} {...post} setPosts={setPosts} />;
      })}
      <div className="suggested-users">
        <div className="suggested-header">
          <h1>Discover People</h1>
        </div>
        {users
          ?.filter(({ _id }) => _id !== userContext?.user._id)
          .map(({ imageUrl, firstName, lastName, _id }) => {
            return (
              <div className="users-container" key={_id}>
                <Link to={`/profile/${_id}`}>
                  <div className="flex items-center grow gap-1">
                    <img src={imageUrl} className="w-14 h-20" />
                    <h4>{firstName}</h4>
                    <h4>{lastName}</h4>
                  </div>
                </Link>
                <button>Follow</button>
              </div>
            );
          })}
      </div>
    </main>
  );
};
