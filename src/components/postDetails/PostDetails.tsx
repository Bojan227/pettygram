import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LikeButton, Details } from '../feed/SvgsContainer';
import { CommentForm } from '../feed/CommentForm';
import { CommentsContainer } from './CommentsContainer';
import { Post } from '../../hooks/useGetPosts';

import './postDetails.css';

interface PostDetailsProps {
  posts: Post[];
  updateLike: (id: string, userId: string) => void;
  isLoading: boolean;
}

export const PostDetails = ({
  posts,
  updateLike,
  isLoading,
}: PostDetailsProps) => {
  const { id } = useParams();

  const [post, setPost] = useState<Post | undefined>(undefined);
  const [commentMessage, setCommentMessage] = useState('');

  useEffect(() => {
    setPost(posts?.find((post) => post._id === id));
  }, [posts]);

  if (isLoading) {
    return <h1>Loading .....</h1>;
  }

  return (
    <div className="post-details">
      <section
        className="details-images-section"
        style={{
          padding: '15px 0px',
          backgroundColor: 'black',
        }}
      >
        {/* {images.map((url) => {
          return (
            <img
              key={url}
              src={url}
              alt="img"
              style={{ width: '100%', height: '100%' }}
            />
          );
        })} */}
        {post && <img src={post.imageUrl} alt="image" />}
      </section>
      <section className="details-info-section">
        <div className="user-section-details">
          <img src={post?.createdBy.imageUrl} />
          <h2>{post?.createdBy.username}</h2>
        </div>
        <div style={{ overflowY: 'scroll', flex: '1' }}>
          <div className="caption-section">
            <h1>{post?.text}</h1>
          </div>
          <CommentsContainer
            commentNotification={setCommentMessage}
            commentMessage={commentMessage}
          />
        </div>

        <div className="buttons-section-details">
          <LikeButton
            likes={post?.likes!}
            updateLike={() => updateLike(post?._id!, post?.createdBy._id!)}
          />

          {/* <Details size={24} /> */}
        </div>
        <section className="likes-info">
          {`${post?.likes.length} ${
            post?.likes.length === 1 ? 'like' : 'likes'
          } `}
          <h5>{post?.createdAt}</h5>
        </section>
        <CommentForm postId={id!} commentNotification={setCommentMessage} />
      </section>
      <Link to="/">
        <h3 className="back-btn">X</h3>
      </Link>
    </div>
  );
};
