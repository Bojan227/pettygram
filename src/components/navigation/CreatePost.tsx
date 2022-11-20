import { DragEvent, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Post } from '../../hooks/useGetPosts';
import { Navigate } from 'react-router-dom';
import useUserContenxt from '../../hooks/useUserContext';
import useCreatePost from '../../hooks/useCreatePost';

interface CreatePostProps {
  toggleCreatePost: boolean;
  setToggleCreatePost: (toggleCreatePost: boolean) => void;
  setPosts: Dispatch<SetStateAction<Post[] | undefined>>;
}

export const CreatePost = ({
  toggleCreatePost,
  setToggleCreatePost,
  setPosts,
}: CreatePostProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [caption, setCaption] = useState('');
  const userContext = useUserContenxt();

  const { createpost, isLoading, message, error } = useCreatePost();

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const handleSubmit = async () => {
    if (files) {
      await createpost(caption, files[0], setPosts);
      setFiles(null);
      setCaption('');
      setToggleCreatePost(false);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setFiles([...e.dataTransfer.files]);
  };

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setFiles([...evt.target.files]);
    }
  };

  return (
    <div
      className="drop-container"
      style={{ display: `${!toggleCreatePost ? 'none' : ''}` }}
      onClick={(e) => {
        e.stopPropagation();
        setToggleCreatePost(false);
        setFiles(null);
        setCaption('');
      }}
    >
      {!files && (
        <div
          className="drop-div"
          onDragOver={(e) => onDragOver(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDrop={(e) => handleDrop(e)}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="p-4">Create new post</h1>
          <h1>Drag Photos and videos here</h1>
          <input
            onChange={(e) => handleImageUpload(e)}
            type="file"
            id="actual-btn"
          />

          <label htmlFor="actual-btn">Choose File</label>
        </div>
      )}
      {files && (
        <div className="share-container" onClick={(e) => e.stopPropagation()}>
          {files && <img src={URL.createObjectURL(files[0])} />}
          <div>
            <div className="user-info">
              <img
                src={userContext?.user.imageUrl}
                alt={userContext?.user.username}
              />

              <h4>{userContext?.user.username}</h4>
            </div>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
            />
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
      )}
      {message && <Navigate to="/" />}
    </div>
  );
};
