// import { LikeButton } from './feed/SvgContainer';
import { SetStateAction, Dispatch } from 'react';
import useUpdateLike from '../../hooks/useUpdateLike';
import { LikeButton } from '../feed/SvgsContainer';
import { Comments } from './CommentsContainer';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

type CommentsCardProps = {
  createdBy: {
    _id: string;
    imageUrl: string;
    username: string;
  };
  comment: string;
  createdAt: string;
  likes: string[];
  _id: string;
  setComments: Dispatch<SetStateAction<Comments[] | undefined>>;
};

export const CommentsCard = ({
  createdBy,
  comment,
  createdAt,
  likes,
  _id,
  setComments,
}: CommentsCardProps) => {
  const { updateLike } = useUpdateLike();

  return (
    <div className="commments-card">
      <section className="comments-info">
        <div className="flex items-center gap-8">
          <Link to={`/profile/${createdBy._id}`}>
            <div className="flex items-center gap-5">
              <img
                src={createdBy.imageUrl}
                alt="img"
                style={{ width: '32px', height: '52px', borderRadius: '50%' }}
              />
              <p style={{ fontWeight: 'bold' }}>{createdBy.username}</p>
            </div>
          </Link>
          <p>{comment}</p>
        </div>
        <LikeButton
          {...{
            likes,
            updateLike: () =>
              updateLike({
                url: 'http://localhost:4000/comments/',
                setState: setComments,
                _id,
              }),
          }}
        />
      </section>
      <section className="comment-card-info">
        {createdAt && (
          <h5>{formatDistanceToNow(new Date(createdAt).getTime())}</h5>
        )}

        <p>{`${likes.length} ${likes.length === 1 ? 'like' : 'likes'} `}</p>
      </section>
    </div>
  );
};
