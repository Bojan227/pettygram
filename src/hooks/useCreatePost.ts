import { useState, Dispatch, SetStateAction } from 'react';
import { Post } from './useGetPosts';

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
        const res = await fetch('http://localhost:4000/posts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${document.cookie.split('=')[1]}`,
          },
          body: JSON.stringify({
            text,
            image: img,
          }),
        });

        const post = await res.json();

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
