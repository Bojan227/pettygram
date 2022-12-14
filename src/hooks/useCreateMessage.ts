import { useState } from 'react';
import { ChatType } from '../context/chatDataContext';
import { token } from '../constants/cookie';
export default function useCreateMessage() {
  const [errorMessage, setErrorMessage] = useState('');

  const createMessage = async (messageData: ChatType) => {
    try {
      await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
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
