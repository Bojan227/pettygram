import { Dispatch, SetStateAction } from 'react';
import useUserContenxt from './useUserContext';

interface updateLikeProps {
  url: string;
  likes: string[];
  setState: Dispatch<SetStateAction<any[] | undefined>>;
  _id: string;
}

export default function useUpdateLike() {
  const userContext = useUserContenxt();

  const updateLike = async ({ url, likes, setState, _id }: updateLikeProps) => {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
        body: JSON.stringify({
          _id,
          like: !likes?.find((id) => id === userContext?.user._id),
          userId: userContext?.user._id,
        }),
      });

      const json = await res.json();
      console.log(json);

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
