import fetcher from '../api/fetcher';
import useUserContext from './useUserContext';
import { UserType } from '../context/userContext';
import { useEffect, useState } from 'react';
import { useAddChatData } from '../context/chatDataContext';

export default function useGetChatHistory(selectedUser: UserType | undefined) {
  const userContext = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addChatHistory = useAddChatData();

  useEffect(() => {
    if (selectedUser?._id) {
      getChatData();
    }
  }, [selectedUser?._id]);

  const getChatData = async () => {
    setIsLoading(true);
    try {
      const chatData = await fetcher(
        `http://localhost:4000/chat?author=${userContext?.user?._id}&receiver=${selectedUser?._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              document.cookie
                .split(';')
                .map((value) => value.trim())
                .filter((value) => value.split('=')[0] === 'token')
                .map((value) => value.split('=')[1])[0]
            }`,
          },
        }
      );

      addChatHistory(chatData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error };
}
