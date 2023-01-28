import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsCard } from './CommentsCard';
import { Comments, CommentsContainerProps } from './types';

export const CommentsContainer = ({
  commentNotification,
  commentMessage,
}: CommentsContainerProps) => {
  const { id } = useParams();
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`http://localhost:4000/posts/${id}/comments`);
        const json = await res.json();

        setComments([...json]);
      } catch (error) {
        console.log(error);
      }
    };

    getComments();

    return () => commentNotification('');
  }, [commentMessage]);

  return (
    <div className="comments-container">
      {comments &&
        comments.map((comment, i) => {
          return <CommentsCard key={i} {...{ ...comment, setComments }} />;
        })}
    </div>
  );
};
