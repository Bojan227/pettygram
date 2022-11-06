import { useState } from 'react';
import { UserType } from '../context/userContext';

export const useGetUsers = () => {
  const [users, setUsers] = useState<UserType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getUsers = async () => {
    setIsLoading(true);

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
