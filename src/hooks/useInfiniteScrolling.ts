import { useEffect, useState } from 'react';
import fetcher from '../api/fetcher';
import { usePostsStore } from '../store/postsStore';

export default function useInfiniteScrolling(page: number) {
  const [isLoadingPagination, setIsLoadingPagination] = useState(false);
  const [errorPagination, setErrorPagination] = useState('');
  const { pagination, setNumberOfPosts } = usePostsStore();

  useEffect(() => {
    if (page > 0) {
      getPosts();
    }
  }, [page]);

  const getPosts = async () => {
    setIsLoadingPagination(true);
    try {
      const { posts, numberOfPosts } = await fetcher(
        `http://localhost:4000/posts/?page=${page}`,
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
      pagination(posts);
    } catch (error) {
      if (error instanceof Error) {
        setErrorPagination(error.message);
      }
    } finally {
      setIsLoadingPagination(false);
    }
  };

  return { getPosts, isLoadingPagination, errorPagination };
}
