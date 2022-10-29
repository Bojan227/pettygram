import { useState } from 'react';
import useUserContenxt from '../hooks/useUserContext';

export interface Post {
  _id: string;
  text: string;
  imageUrl: string;
  imageId: string;
  createdAt: string;
  likes: [string];
  createdBy: {
    imageUrl: string;
    username: string;
    _id: string;
  };
}

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:4000/posts/');
      const json = await res.json();

      setPosts([...json]);
    } catch (error) {
      setError('No posts available');
    } finally {
      setIsLoading(false);
    }
  };

  return { posts, isLoading, error, getPosts, setPosts };
};
