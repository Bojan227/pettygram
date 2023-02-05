import { useState } from 'react';
import fetcher from '../api/fetcher';
import { UserType } from '../context/userContext';
import { url } from '../constants/api';

export const useGetUsers = () => {
  const [users, setUsers] = useState<UserType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const json = await fetcher(`${url}/user/`);
      setUsers([...json]);
    } catch (error) {
      setError('No posts available');
    } finally {
      setIsLoading(false);
    }
  };

  return { users, isLoading, error, getUsers };
};
