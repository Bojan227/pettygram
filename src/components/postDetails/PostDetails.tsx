import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CommentForm } from '../feed/CommentForm';
import { Post } from '../feed/types/feedTypes';
import { formatDistanceToNow } from 'date-fns';
import './postDetails.css';
import default_insta from '../../assets/default_insta.jpg';
import { useNavigate } from 'react-router-dom';
import CarouselSlider from '../feed/CarouselSlider';
import CaptionContainer from './CaptionContainer';
import ButtonsContainer from './ButtonsContainer';
import { useGetData } from '../../hooks/useGetData';
import { url } from '../../constants/api';
import LoadingSpinner from '../LoadingSpinner';
import PostsViewer from './PostsViewer';
import useUserContext from '../../hooks/useUserContext';

export const PostDetails = () => {
  const [post, setPost] = useState<Post>();
  const [commentMessage, setCommentMessage] = useState('');
  const { id } = useParams();
  const userContext = useUserContext();
  const { getData, isLoading } = useGetData();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getData({
        url: `${url}/posts/p/${id}`,
        setState: setPost,
      });
    }
  }, []);

  const updatePost = () => {
    if (post?._id) {
      setPost({
        ...post,
        likes: post.likes.find((like) => like === userContext?.user._id)
          ? (post.likes.filter(
              (like) => like !== userContext?.user._id
            ) as string[])
          : ([...post.likes, userContext?.user._id] as string[]),
      });
    }
  };

  if (isLoading) return <LoadingSpinner className="post-details-spinner" />;

  return (
    <div
      tabIndex={0}
      className="post-details"
      onKeyDown={(e) => e.key === 'Escape' && navigate(-1)}
    >
      <section className="details-images-section">
        {post && <CarouselSlider {...{ images: post?.imageUrl }} />}
      </section>
      <section className="details-info-section">
        <div>
          <Link to={`/profile/${post?.createdBy?._id}`}>
            <div className="user-section-details">
              <img src={post?.createdBy.imageUrl || default_insta} />
              <h2>{post?.createdBy.username}</h2>
            </div>
          </Link>
        </div>
        {post && (
          <CaptionContainer
            {...{ ...post, commentMessage, setCommentMessage }}
          />
        )}
        {post && <ButtonsContainer {...{ ...post!, id, updatePost }} />}
        <section className="likes-info">
          {`${post?.likes.length} ${
            post?.likes.length === 1 ? 'like' : 'likes'
          } `}
          {post && (
            <h5>
              {formatDistanceToNow(new Date(post?.createdAt).getTime(), {
                addSuffix: true,
              })}
            </h5>
          )}
        </section>
        <CommentForm postId={id!} commentNotification={setCommentMessage} />
      </section>

      <h3 onClick={() => navigate(-1)} className="back-btn">
        X
      </h3>
      <PostsViewer {...{ post, setPost }} />
    </div>
  );
};
