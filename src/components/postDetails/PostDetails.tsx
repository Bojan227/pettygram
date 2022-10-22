import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { LikeButton, Details } from './feed/SvgContainer';
import { CommentForm } from '../feed/CommentForm';
import { CommentsContainer } from './CommentsContainer';

import './postDetails.css';

interface PostCardProps {
  createdBy: {
    imageUrl: string;
    username: string;
    _id: string;
  };
  // images: string;
  likes: string[];
  imageUrl: string;
  imageId: string;
  text: string;
  createdAt: string;
  _id: string;
}

export const PostDetails = () => {
  const { id } = useParams();

  const [post, setPost] = useState<PostCardProps | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setCommentMessage] = useState('');

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/posts/${id}`);
        const json = await res.json();

        setPost(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPost();
  }, []);

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
          <div className="description-section">
            <h1>{post?.text}</h1>
          </div>
          <CommentsContainer commentNotification={setCommentMessage} />
        </div>

        <div className="buttons-section-details">
          {/* <LikeButton color={like} toggleLike={toggleLike} size={24} />
          <Details size={24} /> */}
        </div>
        <section
          style={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* {`${likes} ${likes === 1 ? 'like' : 'likes'} `}
          <h5>{createdAt}</h5> */}
        </section>
        <CommentForm postId={id!} commentNotification={setCommentMessage} />
      </section>
      <Link to="/">
        <h3 className="back-btn">X</h3>
      </Link>
    </div>
  );
};
