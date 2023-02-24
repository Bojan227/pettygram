import { LikeButton, Details, Bookmark } from './SvgsContainer';
import { Link } from 'react-router-dom';
import { CommentForm } from './CommentForm';
import { PostCardProps } from './types/feedTypes';
import { formatDistanceToNow } from 'date-fns';
import useUserContext from '../../hooks/useUserContext';
import default_insta from '../../assets/default_insta.jpg';
import CarouselSlider from './CarouselSlider';
import { usePostsStore } from '../../store/postsStore';
import { url } from '../../constants/api';

export const PostCard = ({
  createdBy,
  imageUrl,
  likes,
  text,
  createdAt,
  _id,
  index,
  listRef,
}: PostCardProps): JSX.Element => {
  const userContext = useUserContext();
  const { posts } = usePostsStore();

  return (
    <div className="card" ref={index === posts.length - 1 ? listRef : null}>
      <Link to={`/profile/${createdBy._id}`}>
        <section className="user-section">
          <img src={createdBy.imageUrl || default_insta} />
          <h2>{createdBy.username}</h2>
        </section>
      </Link>
      <Link to={`/p/${_id}`}>
        <CarouselSlider {...{ images: imageUrl }} />
      </Link>
      <section className="buttons-section">
        <LikeButton
          likes={likes}
          receiverId={createdBy._id}
          postId={_id}
          url={`${url}/posts/`}
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
            <img src={createdBy.imageUrl || default_insta} />
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
          <h5>
            {formatDistanceToNow(new Date(createdAt).getTime(), {
              addSuffix: true,
            })}
          </h5>
        )}
      </section>
      <CommentForm {...{ postId: _id }} />
    </div>
  );
};
