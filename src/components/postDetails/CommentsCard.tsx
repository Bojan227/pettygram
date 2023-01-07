// import { LikeButton } from './feed/SvgContainer';
import useUpdateLike from '../../hooks/useUpdateLike';
import { LikeButton } from '../feed/SvgsContainer';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { CommentsCardProps } from './types';
import default_insta from '../../assets/default_insta.jpg';

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
        <div className="flex items-center gap-4">
          <Link to={`/profile/${createdBy._id}`}>
            <div className="flex items-center gap-5">
              <img src={createdBy.imageUrl || default_insta} alt="img" />
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
