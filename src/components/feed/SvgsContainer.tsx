import useUserContenxt from '../../hooks/useUserContext';
import { Link } from 'react-router-dom';
import useUpdateSaved from '../../hooks/useUpdateSaved';

type LikeButtonProps = {
  updateLike: () => void;
  likes: String[];
};

export const LikeButton = ({ updateLike, likes }: LikeButtonProps) => {
  const userContext = useUserContenxt();

  console.log(likes);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={`${
        likes?.find((id) => id === userContext?.user._id) ? 'red' : 'none'
      }`}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: '32px', cursor: 'pointer' }}
      onClick={updateLike}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
};

export const Details = ({ postId }: { postId?: string }) => {
  return (
    <Link to={`/p/${postId}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{ width: '32px', cursor: 'pointer' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
        />
      </svg>
    </Link>
  );
};

export const Bookmark = ({ postId }: { postId: string }) => {
  const userContext = useUserContenxt();
  const { updateSaved } = useUpdateSaved();

  console.log(userContext?.user.saved);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={`${
        userContext?.user?.saved?.find(({ _id }) => _id === postId)
          ? 'black'
          : 'none'
      }`}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      style={{ width: '32px', cursor: 'pointer' }}
      onClick={() => updateSaved({ postId })}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
};
