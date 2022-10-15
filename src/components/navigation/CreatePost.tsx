import { DragEvent, useState } from 'react';
import useUserContenxt from '../../hooks/useUserContext';

export const CreatePost = () => {
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

  return (
    <div className="drop-container">
      {!files && (
        <div
          className="drop-div"
          onDragOver={(e) => onDragOver(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDrop={(e) => handleDrop(e)}
        >
          <h1 className="p-4">Create new post</h1>
          <h1>Drag Photos and videos here</h1>
          <input type="file" />
        </div>
      )}
      {files && (
        <div className="share-container">
          {files && <img src={URL.createObjectURL(files[0])} />}
          <div>
            <div className="user-info">
              <img
                src={userContext?.user.imageUrl}
                alt={userContext?.user.username}
              />
              <h3>{userContext?.user.username}</h3>
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
