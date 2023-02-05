import { useEffect, useState } from 'react';
import fetcher from '../api/fetcher';
import { usePostsStore } from '../store/postsStore';
import { url } from '../constants/api';

export const useGetPosts = () => {
  const [isLoadingState, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { load, setNumberOfPosts } = usePostsStore();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const { posts, numberOfPosts } = await fetcher(
        `${url}/posts/?page=${0}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              document.cookie
                ?.split('; ')
                ?.find((value) => value?.includes('token'))
                ?.split('=')[1]
            }`,
          },
        }
      );
      setNumberOfPosts(numberOfPosts);
      load(posts);
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
