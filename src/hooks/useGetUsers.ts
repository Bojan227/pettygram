import { useState } from 'react';
import useUserContenxt from '../hooks/useUserContext';

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  imageId: string;
  imageUrl: string;
  followers: [string];
  following: [string];
}

export const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const userContext = useUserContenxt();

  const getUsers = async () => {
    setIsLoading(true);
    console.log(userContext?.user._id);

    try {
      const res = await fetch('http://localhost:4000/user/');

      const json = await res.json();

      setUsers([...json]);
    } catch (error) {
      setError('No posts available');
    } finally {
      setIsLoading(false);
    }
  };

  return { users, isLoading, error, getUsers };
};
