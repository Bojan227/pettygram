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
