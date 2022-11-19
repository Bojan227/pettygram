import { LikeButton, Details, Bookmark } from './SvgsContainer';
import { Link } from 'react-router-dom';
import { CommentForm } from './CommentForm';
import useUpdateLike from '../../hooks/useUpdateLike';
import { Dispatch, SetStateAction } from 'react';
import { Post } from '../../hooks/useGetPosts';
import { formatDistanceToNow } from 'date-fns';

type PostCardProps = {
  createdBy: {
    imageUrl: string;
    username: string;
    _id: string;
  };
  // images: string;
  likes: string[];
  imageUrl: string;
  text: string;
  createdAt: string;
  setPosts: Dispatch<SetStateAction<Post[] | undefined>>;
  _id: string;
};

export const PostCard = ({
  createdBy,
  // images,
  imageUrl,
  likes,
  text,
  createdAt,
  _id,
  setPosts,
}: PostCardProps): JSX.Element => {
  const { updateLike } = useUpdateLike();

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
        {/* {images.map((url, i) => {
          return (
            <img
              key={i}
              src={url}
              alt="img"
              style={{ width: '450px', height: '450px' }}
            />
          );
        })} */}
      </div>

      <section className="buttons-section">
        <LikeButton
          likes={likes}
          updateLike={() =>
            updateLike({
              url: 'http://localhost:4000/posts/',
              setState: setPosts,
              _id,
            })
          }
        />
        <Details postId={_id} />
        <Bookmark />
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
