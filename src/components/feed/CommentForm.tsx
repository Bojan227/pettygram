import { useState } from 'react';

export const CommentForm = () => {
  const [comment, setComment] = useState('');

  return (
    <form className="comment-form">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button disabled={!comment ? true : false}>Post</button>
    </form>
  );
};
