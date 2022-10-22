import { useState } from 'react';

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
      const res = await fetch('http://localhost:4000/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
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
      <button
        disabled={!comment ? true : false}
        style={{
          color: `${!comment ? 'rgba(1,1,122, 0.2)' : 'rgb(1,1,122)'}`,
        }}
      >
        Post
      </button>
    </form>
  );
};
