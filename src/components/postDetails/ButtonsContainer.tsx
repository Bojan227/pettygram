import { LikeButton, Details, Bookmark } from '../feed/SvgsContainer';
import useUserContext from '../../hooks/useUserContext';
import { Post } from '../feed/types/feedTypes';
import { url } from '../../constants/api';

export default function ButtonsContainer({
  likes,
  createdBy,
  _id,
  id,
  updatePost,
}: Pick<Post, '_id' | 'createdBy' | 'likes'> & {
  id: string | undefined;
  updatePost: () => void;
}) {
  const userContext = useUserContext();

  return (
    <div className="buttons-section-details">
      {likes && (
        <LikeButton
          {...{
            likes,
            receiverId: createdBy._id,
            postId: id!,
            url: `${url}/posts/`,
            updatePost,
          }}
        />
      )}
      <Details postId={_id} />
      {userContext?.user._id !== createdBy._id ? (
        <Bookmark postId={_id!} />
      ) : (
        ''
      )}
    </div>
  );
}
