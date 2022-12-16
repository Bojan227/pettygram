import { useState } from 'react';
import { ChatType } from '../context/chatDataContext';
export default function useCreateMessage() {
  const [errorMessage, setErrorMessage] = useState('');

  const createMessage = async (messageData: ChatType) => {
    try {
      await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            document.cookie
              ?.split('; ')
              ?.find((value) => value?.includes('token'))
              ?.split('=')[1]
          }`,
        },
        body: JSON.stringify(messageData),
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return { createMessage, errorMessage };
}
