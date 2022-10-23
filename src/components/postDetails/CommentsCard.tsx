// import { LikeButton } from './feed/SvgContainer';
import { SetStateAction, Dispatch } from 'react';
import useUpdateLike from '../../hooks/useUpdateLike';
import useUserContenxt from '../../hooks/useUserContext';
import { LikeButton } from '../feed/SvgsContainer';
import { Comments } from './CommentsContainer';
import { formatDistanceToNow } from 'date-fns';

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
  const userContext = useUserContenxt();
  const { updateLike } = useUpdateLike();

  return (
    <div className="commments-card">
      <section className="comments-info">
        <div style={{ display: 'flex', gap: '15px' }}>
          <img
            src={createdBy.imageUrl}
            alt="img"
            style={{ width: '32px', borderRadius: '50%' }}
          />
          <p style={{ fontWeight: 'bold' }}>{createdBy.username}</p>
          <p>{comment}</p>
        </div>
        <LikeButton
          {...{
            likes,
            updateLike: () =>
              updateLike({
                url: 'http://localhost:4000/comments/',
                likes,
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
