import { Dispatch, SetStateAction } from 'react';
import fetcher from '../api/fetcher';
import { usePostsStore } from '../store/postsStore';

interface updateLikeProps {
  url: string;
  _id: string;
}

export default function useUpdateLike() {
  const { changeLikeState } = usePostsStore();

  const updateLike = async ({ url, _id }: updateLikeProps) => {
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
          postId: _id,
        }),
      });

      changeLikeState(json.post);
    } catch (error) {
      error;
    }
  };

  return { updateLike };
}
