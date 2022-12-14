import { useState, Dispatch, SetStateAction } from 'react';
import { Post } from '../components/feed/types/feedTypes';
import fetcher from '../api/fetcher';
import { token } from '../constants/cookie';

export default function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const createpost = async (
    text: string,
    image: File,
    setPosts: Dispatch<SetStateAction<Post[] | undefined>>
  ) => {
    setIsLoading(true);

    const reader: any = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadWithImage(reader.result);
    };

    const uploadWithImage = async (img: string) => {
      try {
        const post = await fetcher('http://localhost:4000/posts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            text,
            image: img,
          }),
        });

        setPosts((prevPosts) => [...prevPosts!, post]);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
  };

  return {
    createpost,
    isLoading,
    error,
    message,
  };
}
