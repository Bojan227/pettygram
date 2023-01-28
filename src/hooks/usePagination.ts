import { useState } from 'react';
import fetcher from '../api/fetcher';
import { usePostsStore } from '../store/postsStore';

export default function usePagination() {
  const [isLoadingPagination, setIsLoadingPagination] = useState(false);
  const [errorPagination, setErrorPagination] = useState('');
  const { pagination } = usePostsStore();

  const getPosts = async (page: number) => {
    console.log(page);
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
