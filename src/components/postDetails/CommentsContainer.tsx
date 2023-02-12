import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsCard } from './CommentsCard';
import { Comments, CommentsContainerProps } from './types';
import { url } from '../../constants/api';
import LoadingSpinner from '../LoadingSpinner';

export const CommentsContainer = ({
  commentNotification,
  commentMessage,
}: CommentsContainerProps) => {
  const { id } = useParams();
  const [comments, setComments] = useState<Comments[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${url}/posts/${id}/comments`);
        const json = await res.json();

        setComments([...json]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getComments();

    return () => commentNotification('');
  }, [commentMessage]);

  return (
    <div className="comments-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        comments.map((comment, i) => {
          return <CommentsCard key={i} {...{ ...comment, setComments }} />;
        })
      )}
    </div>
  );
};
