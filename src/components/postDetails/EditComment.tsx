import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Comments } from './types';
import useEditComment from '../../hooks/useEditComment';

export default function EditComment({
  setComments,
  _id,
  comment,
  setSelectedCommentId,
}: {
  comment: string;
  setComments: Dispatch<SetStateAction<Comments[]>>;
  setSelectedCommentId: Dispatch<SetStateAction<string | undefined>>;
  _id: string;
}) {
  const { editComment, isLoading } = useEditComment();
  const [commentInput, setComment] = useState(comment);

  const handleEditComment = async () => {
    const newComment = await editComment(_id, commentInput);

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === newComment?._id
          ? { ...comment, comment: newComment.comment }
          : comment
      )
    );
    setSelectedCommentId(undefined);
  };

  return (
    <div className="comment">
      <input
        className="edit-comment-input"
        value={commentInput}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={() => handleEditComment()}>
        {isLoading ? 'Loading...' : 'Save edit'}
      </button>
    </div>
  );
}
