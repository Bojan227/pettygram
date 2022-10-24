import { PostCard } from './PostCard';
import { Dispatch, SetStateAction } from 'react';
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
  return (
    <main className="feed-container">
      {error && <h1>{error}</h1>}
      {posts?.map((post, i) => {
        return <PostCard key={i} {...post} setPosts={setPosts} />;
      })}
    </main>
  );
};
