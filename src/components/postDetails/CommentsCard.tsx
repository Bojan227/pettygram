import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { CommentsCardProps } from './types';
import default_insta from '../../assets/default_insta.jpg';
import useUserContext from '../../hooks/useUserContext';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import EditComment from './EditComment';
import LikeComment from './LikeComment';

export const CommentsCard = ({
  createdBy,
  comment,
  createdAt,
  likes,
  _id,
  setComments,
}: CommentsCardProps) => {
  const userContext = useUserContext();
  const [selectedComment, setSelectedComment] = useState<string | undefined>(
    undefined
  );

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

          {selectedComment ? (
            <EditComment
              {...{ setComments, selectedComment, setSelectedComment }}
            />
          ) : (
            <p>{comment}</p>
          )}
        </div>
        <LikeComment {...{ likes, _id, setComments }} />
      </section>
      <section className="comment-card-info">
        {createdAt && (
          <h5>{formatDistanceToNow(new Date(createdAt).getTime())}</h5>
        )}
        <p>{`${likes.length} ${likes.length === 1 ? 'like' : 'likes'} `}</p>
        {userContext?.user._id === createdBy._id ? (
          <PencilSquareIcon
            onClick={() => setSelectedComment(_id)}
            width="20px"
            height="20px"
          />
        ) : null}
      </section>
    </div>
  );
};
