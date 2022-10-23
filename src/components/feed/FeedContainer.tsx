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
    <main className="flex flex-col justify-center items-center p-11 gap-10 w-full min-h-screen ml-32">
      {error && <h1>{error}</h1>}
      {posts?.map((post, i) => {
        return <PostCard key={i} {...post} setPosts={setPosts} />;
      })}
    </main>
  );
};
