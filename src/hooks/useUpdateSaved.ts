import useUserContext from './useUserContext';

interface updateSavedProps {
  postId: string;
}

const uri = 'http://localhost:4000/saved/';

export default function useUpdateSaved() {
  const userContext = useUserContext();

  const updateSaved = async ({ postId }: updateSavedProps) => {
    try {
      const res = await fetch(uri, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
        body: JSON.stringify({
          postId,
        }),
      });

      const { user } = await res.json();

      userContext?.dispatch({
        type: 'UPDATE_SAVED',
        payload: {
          postId,
          newPost: user.saved.find(
            ({ _id }: { _id: string }) => _id === postId
          ),
        },
      });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  return { updateSaved };
}
