import { useState } from 'react';
import fetcher from '../api/fetcher';
import { usePostsStore } from '../store/postsStore';

interface updateLikeProps {
  url: string;
  postId: string;
}

export default function useUpdateLike() {
  const { changeLikeState } = usePostsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const updateLike = async ({ url, postId }: updateLikeProps) => {
    setIsLoading(true);
    try {
      const json = await fetcher(url, {
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
          postId,
        }),
      });
      changeLikeState(json.post);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateLike, isLoading };
}
