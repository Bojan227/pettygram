import default_insta from '../../assets/default_insta.jpg';
import { Link } from 'react-router-dom';
import { CommentsContainer } from './CommentsContainer';
import { Post } from '../feed/types/feedTypes';

export default function CaptionContainer({
  createdBy,
  text,
  setCommentMessage,
  commentMessage,
}: Pick<Post, 'createdBy' | 'text'> & {
  commentMessage: string;
  setCommentMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  console.log(commentMessage);
  return (
    <div className="caption-comments">
      <div className="caption-section">
        <Link to={`/profile/${createdBy._id}`}>
          <div className="caption-info">
            <img src={createdBy.imageUrl || default_insta} />
            <h2>{createdBy.username}</h2>
          </div>
        </Link>
        <h1>{text}</h1>
      </div>
      <CommentsContainer
        commentNotification={setCommentMessage}
        commentMessage={commentMessage}
      />
    </div>
  );
}
