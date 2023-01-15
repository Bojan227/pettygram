import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Post } from '../feed/types/feedTypes';
import DropFileContainer from './DropFileContainer';
import ImagesContainer from './ImagesContainer';
import CaptionContainer from './CaptionContainer';

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
  const [files, setFiles] = useState<File[]>([]);

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setFiles((prevFiles) => [...prevFiles!, ...evt.target.files!]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div
      className="drop-container"
      style={{ display: `${!toggleCreatePost ? 'none' : ''}` }}
      onClick={(e) => {
        e.stopPropagation();
        setToggleCreatePost(false);
        setFiles([]);
      }}
    >
      {files.length === 0 && (
        <DropFileContainer {...{ handleImageUpload, setFiles }} />
      )}
      {files.length !== 0 && (
        <div className="share-container" onClick={(e) => e.stopPropagation()}>
          <ImagesContainer
            {...{ files, handleImageUpload, handleRemoveFile }}
          />
          <CaptionContainer {...{ files, setPosts }} />
        </div>
      )}
    </div>
  );
};
