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
      const json = await fetcher('http://localhost:4000/posts/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            document.cookie
              ?.split('; ')
              ?.find((value) => value?.includes('token'))
              ?.split('=')[1]
          }`,
        },
      });
      setPosts(json);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { posts, isLoading, error, getPosts, setPosts };
};
