import { useState } from 'react';
import fetcher from '../api/fetcher';
import { url } from '../constants/api';

export default function useDeleteComment() {
  const [errorMsg, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteComment = async (commentId: string) => {
    setIsDeleting(true);
    try {
      await fetcher(`${url}/comments/`, {
        method: 'DELETE',
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
        }),
      });

      return commentId;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteComment, errorMsg, isDeleting };
}
