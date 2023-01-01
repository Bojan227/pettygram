import { LikeButton, Details, Bookmark } from './SvgsContainer';
import { Link } from 'react-router-dom';
import { CommentForm } from './CommentForm';
import useUpdateLike from '../../hooks/useUpdateLike';
import { PostCardProps } from './types/feedTypes';
import { formatDistanceToNow } from 'date-fns';
import useUserContext from '../../hooks/useUserContext';

export const PostCard = ({
  createdBy,
  imageUrl,
  likes,
  text,
  createdAt,
  _id,
  setPosts,
}: PostCardProps): JSX.Element => {
  const { updateLike } = useUpdateLike();
  const userContext = useUserContext();

  return (
    <div className="card">
      <Link to={`/profile/${createdBy._id}`}>
        <section className="user-section">
          <img src={createdBy.imageUrl} />
          <h2>{createdBy.username}</h2>
        </section>
      </Link>
      <div className="images-section">
        <img src={imageUrl} alt="img" />
      </div>
      <section className="buttons-section">
        <LikeButton
          likes={likes}
          receiverId={createdBy._id}
          updateLike={() =>
            updateLike({
              url: 'http://localhost:4000/posts/',
              setState: setPosts,
              _id,
            })
          }
        />
        <Details postId={_id} />
        {userContext?.user._id !== createdBy._id ? (
          <Bookmark postId={_id} />
        ) : (
          ''
        )}
      </section>
      <section className="likes-section">
        <h4>{`${likes.length} ${likes.length === 1 ? 'like' : 'likes'}`}</h4>
      </section>

      <section className="description-section">
        <Link to={`/profile/${createdBy._id}`}>
          <div>
            <img src={createdBy.imageUrl} />
            <h2>{createdBy.username}</h2>
          </div>
        </Link>
        <p>{text}</p>
      </section>

      <section>
        <Link to={`/p/${_id}`}>
          <p>View all comments</p>
        </Link>
      </section>

      <section>
        {createdAt && (
          <h5>{formatDistanceToNow(new Date(createdAt).getTime())}</h5>
        )}
      </section>
      <CommentForm {...{ postId: _id }} />
    </div>
  );
};
