import { Dispatch, SetStateAction } from 'react';
import fetcher from '../api/fetcher';

interface updateLikeProps {
  url: string;
  setState: Dispatch<SetStateAction<any[] | undefined>>;
  _id: string;
}

export default function useUpdateLike() {
  const updateLike = async ({ url, setState, _id }: updateLikeProps) => {
    try {
      const json = await fetcher(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
        body: JSON.stringify({
          postId: _id,
        }),
      });

      setState((prevState) => {
        return prevState?.map((state) => {
          if (state._id === json.post._id) {
            return {
              ...json.post,
            };
          } else {
            return state;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { updateLike };
}
