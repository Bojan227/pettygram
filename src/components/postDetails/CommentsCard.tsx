// import { LikeButton } from './feed/SvgContainer';
import { useState } from 'react';

type CommentsCardProps = {
  createdBy: {
    _id: string;
    imageUrl: string;
    username: string;
  };
  comment: string;
  createdAt: string;
  likes: number;
};

export const CommentsCard = ({
  createdBy,
  comment,
  createdAt,
  likes,
}: CommentsCardProps) => {
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
        {/* <LikeButton color={like} toggleLike={toggleLike} size={18} /> */}
      </section>
      <section style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <p>{createdAt}</p>
        <p>{`${likes} ${likes === 1 ? 'like' : 'likes'} `}</p>
      </section>
    </div>
  );
};
