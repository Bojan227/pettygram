import { useState } from 'react';
import { CommentButton } from '../buttons/CommentButton';
import { url } from '../../constants/api';

interface CommentFormProps {
  postId: string;
  commentNotification?: (comment: string) => void;
}

export const CommentForm = ({
  postId,
  commentNotification,
}: CommentFormProps) => {
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createComment = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/comments/`, {
        method: 'POST',
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
          comment,
          post: postId,
        }),
      });

      const json = await res.json();

      commentNotification!(json.message);

      setErrorMessage(json?.error);
    } catch (error) {
      console.log(error);
    } finally {
      setComment('');
    }
  };

  return (
    <form className="comment-form" onSubmit={createComment}>
      {errorMessage}
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <CommentButton
        disabled={comment ? false : true}
        className={comment ? 'text-zinc-900' : 'text-slate-300'}
      >
        Post
      </CommentButton>
    </form>
  );
};
