import { LikeButton, Details } from './SvgsContainer';
import { CommentForm } from './CommentForm';
import { useState } from 'react';
import me from '../navigation/images/me.jpg';
type PostCardProps = {
  createdBy: string;
  images: string[];
  likes: number;
  description: string;
  createdAt: string;
};

export const PostCard = ({
  createdBy,
  images,
  likes,
  description,
  createdAt,
}: PostCardProps): JSX.Element => {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike((prev) => !prev);
  };

  return (
    <div className="card">
      <section className="user-section">
        <img src={me} />
        <h2>{createdBy}</h2>
      </section>
      <div className="images-section">
        {images.map((url, i) => {
          return (
            <img
              key={i}
              src={url}
              alt="img"
              style={{ width: '450px', height: '450px' }}
            />
          );
        })}
      </div>

      <section className="buttons-section">
        <LikeButton like={like} toggleLike={toggleLike} />
        <Details />
      </section>
      <section className="likes-section">
        <h4>{`${likes} ${likes === 1 ? 'like' : 'likes'}`}</h4>
      </section>

      <section className="description-section">
        <p>{description}</p>
      </section>

      <section>
        <p>View all comments </p>
      </section>

      <section>
        <p>{createdAt}</p>
      </section>
      <CommentForm />
    </div>
  );
};
