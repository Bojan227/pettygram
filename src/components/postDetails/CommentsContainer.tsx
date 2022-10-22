import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsCard } from './CommentsCard';

interface Comments {
  comment: string;
  post: string;
  createdBy: {
    _id: string;
    username: string;
    imageUrl: string;
  };
  createdAt: string;
  likes: number;
}

export const CommentsContainer = () => {
  const { id } = useParams();
  const [comments, setComments] = useState<Comments[] | undefined>([]);

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
  }, []);

  return (
    <div className="comments-container">
      {comments &&
        comments.map((comment, i) => {
          return <CommentsCard key={i} {...{ ...comment }} />;
        })}
    </div>
  );
};
