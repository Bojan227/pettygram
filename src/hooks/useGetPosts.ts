import { useEffect, useState } from 'react';
import fetcher from '../api/fetcher';
import { usePostsStore } from '../store/postsStore';

export const useGetPosts = () => {
  const [isLoadingState, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { load } = usePostsStore();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const json = await fetcher(`http://localhost:4000/posts/?page=${0}`, {
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
      load(json);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoadingState, error };
};
