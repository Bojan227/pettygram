import { PostCard } from './PostCard';
import './feed.css';
import { Post } from '../../hooks/useGetPosts';

interface FeedContainerProps {
  posts: Post[];
  updateLike: (id: string, userId: string) => void;
  error: string;
}

export const FeedContainer = ({
  posts,
  updateLike,
  error,
}: FeedContainerProps) => {
  return (
    <main className="flex flex-col justify-center items-center p-11 gap-10 w-full min-h-screen ml-32">
      {error && <h1>{error}</h1>}
      {posts?.map((post, i) => {
        return (
          <PostCard
            key={i}
            {...post}
            updateLike={() => updateLike(post._id, post.createdBy._id)}
          />
        );
      })}
    </main>
  );
};
