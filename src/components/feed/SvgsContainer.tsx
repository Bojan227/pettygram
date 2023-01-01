import useUserContenxt from '../../hooks/useUserContext';
import { Link } from 'react-router-dom';
import useUpdateSaved from '../../hooks/useUpdateSaved';
import { LikeButtonProps } from './types/feedTypes';
import { socket } from '../../constants/socket';

export const LikeButton = ({
  updateLike,
  likes,
  receiverId,
}: LikeButtonProps) => {
  const userContext = useUserContenxt();

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
      onClick={() => {
        updateLike();
        socket.emit('send_like', {
          senderId: userContext?.user._id,
          action: 'like',
          receiverId,
          message: `${userContext?.user._id} liked your post!`,
        });
      }}
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
export const Edit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
};
