import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LikeButton, Details } from '../feed/SvgsContainer';
import { CommentForm } from '../feed/CommentForm';
import { CommentsContainer } from './CommentsContainer';
import { PostDetailsProps } from './types';
import { Post } from '../feed/types/feedTypes';
import useUpdateLike from '../../hooks/useUpdateLike';
import { formatDistanceToNow } from 'date-fns';
import { Bookmark } from '../feed/SvgsContainer';
import useUserContext from '../../hooks/useUserContext';
import './postDetails.css';
import default_insta from '../../assets/default_insta.jpg';

export const PostDetails = ({
  posts,
  setPosts,
  isLoading,
}: PostDetailsProps) => {
  const { id } = useParams();
  const { updateLike } = useUpdateLike();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [commentMessage, setCommentMessage] = useState('');
  const userContext = useUserContext();

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
        <div>
          <Link to={`/profile/${post?.createdBy._id}`}>
            <div className="user-section-details">
              <img src={post?.createdBy.imageUrl || default_insta} />
              <h2>{post?.createdBy.username}</h2>
            </div>
          </Link>
        </div>
        <div className="caption-comments">
          <div className="caption-section">
            <Link to={`/profile/${post?.createdBy._id}`}>
              <div className="caption-info">
                <img src={post?.createdBy.imageUrl || default_insta} />
                <h2>{post?.createdBy.username}</h2>
              </div>
            </Link>
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
            receiverId={post?.createdBy._id!}
            updateLike={() =>
              updateLike({
                url: 'http://localhost:4000/posts/',
                setState: setPosts,
                _id: id!,
              })
            }
          />

          <Details />
          {userContext?.user._id !== post?.createdBy._id ? (
            <Bookmark postId={post?._id!} />
          ) : (
            ''
          )}
        </div>
        <section className="likes-info">
          {`${post?.likes.length} ${
            post?.likes.length === 1 ? 'like' : 'likes'
          } `}
          {post && (
            <h5>{formatDistanceToNow(new Date(post?.createdAt).getTime())}</h5>
          )}
        </section>
        <CommentForm postId={id!} commentNotification={setCommentMessage} />
      </section>
      <Link to="/">
        <h3 className="back-btn">X</h3>
      </Link>
    </div>
  );
};
