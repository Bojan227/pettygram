import { LikeButton, Details } from './SvgsContainer';
import { CommentForm } from './CommentForm';

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
  updateLike: () => void;
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
  updateLike,
}: PostCardProps): JSX.Element => {
  return (
    <div className="border border-solid border-[#e2e8f0] shadow-[rgba(99, 99, 99, 0.2) 0px 2px 8px 0px] bg-white rounded-lg">
      <section className="user-section">
        <img src={createdBy.imageUrl} />
        <h2>{createdBy.username}</h2>
      </section>
      <div className="images-section">
        <img
          src={imageUrl}
          alt="img"
          style={{ width: '450px', height: '450px' }}
        />
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
        <LikeButton likes={likes} updateLike={updateLike} />
        <Details />
      </section>
      <section className="likes-section">
        <h4>{`${likes.length} ${likes.length === 1 ? 'like' : 'likes'}`}</h4>
      </section>

      <section className="description-section">
        <p>{text}</p>
      </section>

      <section>
        <p>View all comments </p>
      </section>

      <section>
        <p>{createdAt}</p>
      </section>
      <CommentForm {...{ postId: _id }} />
    </div>
  );
};
