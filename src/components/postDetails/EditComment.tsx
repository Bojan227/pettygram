import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Comments } from './types';
import useEditComment from '../../hooks/useEditComment';

export default function EditComment({
  setComments,
  selectedComment,
  setSelectedComment,
}: {
  setComments: Dispatch<SetStateAction<Comments[]>>;
  selectedComment: string;
  setSelectedComment: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { editComment, isLoading } = useEditComment();
  const [comment, setComment] = useState('');

  const handleEditComment = async () => {
    const newComment = await editComment(selectedComment, comment);

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === newComment?._id
          ? { ...comment, comment: newComment.comment }
          : comment
      )
    );
    setSelectedComment(undefined);
  };

  return (
    <div className="comment">
      <input
        className="edit-comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={() => handleEditComment()}>
        {isLoading ? 'Loading...' : 'Save edit'}
      </button>
    </div>
  );
}
