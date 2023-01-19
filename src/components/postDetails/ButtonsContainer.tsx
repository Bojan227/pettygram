import { LikeButton, Details, Bookmark } from '../feed/SvgsContainer';
import useUserContext from '../../hooks/useUserContext';
import useUpdateLike from '../../hooks/useUpdateLike';
import { Post } from '../feed/types/feedTypes';

export default function ButtonsContainer({
  likes,
  createdBy,
  setPosts,
  _id,
  id,
}: Pick<Post, '_id' | 'createdBy' | 'likes'> & {
  id: string | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
}) {
  const userContext = useUserContext();
  const { updateLike } = useUpdateLike();

  console.log(_id);
  return (
    <div className="buttons-section-details">
      <LikeButton
        likes={likes!}
        receiverId={createdBy._id!}
        updateLike={() =>
          updateLike({
            url: 'http://localhost:4000/posts/',
            setState: setPosts,
            _id: id!,
          })
        }
      />
      <Details postId={_id} />
      {userContext?.user._id !== createdBy._id ? (
        <Bookmark postId={_id!} />
      ) : (
        ''
      )}
    </div>
  );
}
