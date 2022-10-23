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

  const userContext = useUserContenxt();

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

  const updateLike = async (id: string, userId: string) => {
    const findPost = posts?.find((post) => post._id === id);
    console.log(findPost);
    try {
      const res = await fetch('http://localhost:4000/posts/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
        body: JSON.stringify({
          _id: id,
          like: !findPost?.likes.find((id) => id === userContext?.user._id),
          userId,
        }),
      });

      const json = await res.json();

      setPosts((prevPosts) => {
        return prevPosts?.map((post) => {
          if (post._id === json.post._id) {
            return {
              ...json.post,
            };
          } else {
            return post;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { posts, updateLike, isLoading, error, getPosts, setPosts };
};
