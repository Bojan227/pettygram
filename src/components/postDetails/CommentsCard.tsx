import useUpdateLike from '../../hooks/useUpdateLike';
import { LikeButton } from '../feed/SvgsContainer';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { CommentsCardProps } from './types';
import default_insta from '../../assets/default_insta.jpg';
import useUserContext from '../../hooks/useUserContext';
import { url } from '../../constants/api';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export const CommentsCard = ({
  createdBy,
  comment,
  createdAt,
  likes,
  _id,
  setComments,
}: CommentsCardProps) => {
  const { updateLike } = useUpdateLike();
  const userContext = useUserContext();
  const [editComment, setEditComment] = useState<{
    _id: string;
    comment: string;
  }>({ _id: '', comment: '' });

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

          {editComment._id === _id ? (
            <div className="comment">
              <input
                className="edit-comment-input"
                value={editComment.comment}
                onChange={(e) =>
                  setEditComment((prevComment) => ({
                    ...prevComment,
                    comment: e.target.value,
                  }))
                }
              />
              <button onClick={() => setEditComment({ _id: '', comment: '' })}>
                Save edit
              </button>
            </div>
          ) : (
            <p>{comment}</p>
          )}
        </div>
        <LikeButton
          {...{
            likes,
            updateLike: () => {
              updateLike({
                url: `${url}/comments/`,
                _id,
              }),
                setComments((prevComments) =>
                  prevComments?.map((comments) =>
                    comments._id === _id
                      ? {
                          ...comments,
                          likes: comments.likes.find(
                            (like) => like === userContext?.user._id
                          )
                            ? comments.likes.filter(
                                (like) => like !== userContext?.user._id
                              )
                            : [...comments.likes, userContext?.user._id!],
                        }
                      : comments
                  )
                );
            },
          }}
        />
      </section>
      <section className="comment-card-info">
        {createdAt && (
          <h5>{formatDistanceToNow(new Date(createdAt).getTime())}</h5>
        )}
        <p>{`${likes.length} ${likes.length === 1 ? 'like' : 'likes'} `}</p>
        {userContext?.user._id === createdBy._id ? (
          <PencilSquareIcon
            onClick={() =>
              setEditComment(() => ({
                _id,
                comment,
              }))
            }
            width="24px"
            height="24px"
          />
        ) : null}
      </section>
    </div>
  );
};
