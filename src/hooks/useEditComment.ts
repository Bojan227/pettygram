import { useState } from 'react';
import fetcher from '../api/fetcher';
import { url } from '../constants/api';

export default function useEditComment() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const editComment = async (commentId: string, comment: string) => {
    setIsLoading(true);
    try {
      const { newComment } = await fetcher(`${url}/comments/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            document.cookie
              ?.split('; ')
              ?.find((value) => value?.includes('token'))
              ?.split('=')[1]
          }`,
        },
        body: JSON.stringify({
          commentId,
          comment,
        }),
      });

      return newComment;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { editComment, error, isLoading };
}
