import { useState } from 'react';

interface Posts {
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
  const [posts, setPosts] = useState<Posts[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:4000/posts/');
      const json = await res.json();

      setPosts([...json]);
    } catch (error) {
      setMessage('No posts available');
    } finally {
      setIsLoading(false);
    }
  };

  return { posts, isLoading, message, getPosts, setPosts };
};
