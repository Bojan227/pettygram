import { useState } from 'react';
import { Post } from '../components/feed/types/feedTypes';
import fetcher from '../api/fetcher';

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const json = await fetcher('http://localhost:4000/posts/');
      setPosts(json);
    } catch (error) {
      setError('No posts available');
    } finally {
      setIsLoading(false);
    }
  };

  return { posts, isLoading, error, getPosts, setPosts };
};
