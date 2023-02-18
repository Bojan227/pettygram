import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { CommentsCardProps } from './types';
import default_insta from '../../assets/default_insta.jpg';
import useUserContext from '../../hooks/useUserContext';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import EditComment from './EditComment';
import LikeComment from './LikeComment';
import { TrashIcon } from '@heroicons/react/20/solid';
import useDeleteComment from '../../hooks/useDeleteComment';
import LoadingSpinner from '../LoadingSpinner';

export const CommentsCard = ({
  createdBy,
  comment,
  createdAt,
  likes,
  _id,
  setComments,
}: CommentsCardProps) => {
  const userContext = useUserContext();
  const { isDeleting, deleteComment, errorMsg } = useDeleteComment();
  const [selectedCommentId, setSelectedCommentId] = useState<
    string | undefined
  >(undefined);

  const handleDeleteComment = () => {
    deleteComment(_id);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== _id)
    );
  };

  return (
    <div className="commments-card">
      <section className="comments-info">
        <div>
          <Link to={`/profile/${createdBy._id}`}>
            <div className="flex items-center gap-5">
              <img src={createdBy.imageUrl || default_insta} alt="img" />
              <p style={{ fontWeight: 'bold' }}>{createdBy.username}</p>
            </div>
          </Link>

          {selectedCommentId ? (
            <EditComment
              {...{
                setComments,
                _id,
                comment,
                setSelectedCommentId,
              }}
            />
          ) : (
            <p>{comment}</p>
          )}
        </div>
        <LikeComment {...{ likes, _id, setComments }} />
      </section>
      <section className="comment-card-info">
        {createdAt && (
          <h5>
            {formatDistanceToNow(new Date(createdAt).getTime(), {
              addSuffix: true,
            })}
          </h5>
        )}
        <p>{`${likes.length} ${likes.length === 1 ? 'like' : 'likes'} `}</p>
        {userContext?.user._id === createdBy._id ? (
          <>
            <PencilSquareIcon
              onClick={() => setSelectedCommentId(_id)}
              width="20px"
              height="20px"
            />
            {isDeleting ? (
              <LoadingSpinner />
            ) : (
              <TrashIcon
                onClick={handleDeleteComment}
                width="20px"
                height="20px"
              />
            )}
          </>
        ) : null}
      </section>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};
