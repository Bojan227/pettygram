import { LikeButton, Details } from './SvgsContainer';
import { CommentForm } from './CommentForm';
import { useState } from 'react';
import me from '../navigation/images/me.jpg';
type PostCardProps = {
  createdBy: {
    imageUrl: string;
    username: string;
    _id: string;
  };
  images: string;
  likes: string[];
  description: string;
  createdAt: string;
  updateLike: () => void;
};

export const PostCard = ({
  createdBy,
  images,
  likes,
  description,
  createdAt,
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
          src={images}
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
