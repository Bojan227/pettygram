import fetcher from '../api/fetcher';
import { useState, useEffect } from 'react';
import useUserContext from './useUserContext';
import { UserType } from '../context/userContext';
import { url } from '../constants/api';

export default function useGetUsersById() {
  const userContext = useUserContext();
  const [users, setUsers] = useState<UserType[]>();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = await Promise.all(
      [...userContext?.user.following!].map((user) =>
        fetcher(`${url}/user/${user?._id}`)
      )
    );
    setUsers(users);
  };

  return { users };
}
