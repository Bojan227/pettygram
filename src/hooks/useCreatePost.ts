import { useState, Dispatch, SetStateAction } from 'react';
import { Post } from '../components/feed/types/feedTypes';
import fetcher from '../api/fetcher';
import { fileReader } from '../utils/fileReader';

export default function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const createPost = async (
    text: string,
    files: File[],
    setPosts: Dispatch<SetStateAction<Post[] | undefined>>
  ) => {
    setIsLoading(true);
    try {
      const images = await fileReader(files);
      const post = await fetcher('http://localhost:4000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            document.cookie
              ?.split('; ')
              ?.find((value) => value?.includes('token'))
              ?.split('=')[1]
          }`,
        },
        body: JSON.stringify({
          text,
          images,
        }),
      });

      setPosts((prevPosts) => [...prevPosts!, post]);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    isLoading,
    error,
    message,
  };
}
