import { DragEvent, useState } from 'react';
import useUserContenxt from '../../hooks/useUserContext';

interface CreatePostProps {
  toggleCreatePost: boolean;
  setToggleCreatePost: (toggleCreatePost: boolean) => void;
}

export const CreatePost = ({
  toggleCreatePost,
  setToggleCreatePost,
}: CreatePostProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [caption, setCaption] = useState('');
  const userContext = useUserContenxt();

  console.log(files);
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

    console.log(e);
    console.log('wtf');
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
            <button>Share</button>
          </div>
        </div>
      )}
    </div>
  );
};
