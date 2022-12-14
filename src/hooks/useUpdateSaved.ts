import fetcher from '../api/fetcher';
import useUserContext from './useUserContext';
import { token } from '../constants/cookie';

interface updateSavedProps {
  postId: string;
}

export default function useUpdateSaved() {
  const userContext = useUserContext();

  const updateSaved = async ({ postId }: updateSavedProps) => {
    try {
      const { user, post } = await fetcher('http://localhost:4000/saved/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          postId,
        }),
      });

      userContext?.dispatch({
        type: 'UPDATE_SAVED',
        payload: {
          postId,
          post,
        },
      });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  return { updateSaved };
}
