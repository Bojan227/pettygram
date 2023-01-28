import { useEffect, useState } from 'react';
import fetcher from '../api/fetcher';
import { usePostsStore } from '../store/postsStore';

export default function usePagination() {
  const [page, setPage] = useState(0);
  const [isLoadingPagination, setIsLoadingPagination] = useState(false);
  const [errorPagination, setErrorPagination] = useState('');
  const { pagination, setNumberOfPosts, posts, numberOfPosts } =
    usePostsStore();

  useEffect(() => {
    if (page > 0) {
      getPosts();
    }
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
        if (posts.length === numberOfPosts) return;
        if (numberOfPosts < page * 5) return;
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [posts.length]);

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
