import { DragEvent } from 'react';
import { Dispatch, SetStateAction } from 'react';
import FileInput from '../FileInput';

export default function DropFileContainer({
  handleImageUpload,
  setFiles,
}: {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
}) {
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

  return (
    <div
      className="drop-div"
      onDragOver={(e) => onDragOver(e)}
      onDragEnter={(e) => onDragEnter(e)}
      onDrop={(e) => handleDrop(e)}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="p-4">Create new post</h1>
      <h1>Drag Photos and videos here</h1>
      <FileInput {...{ handleImageUpload, title: 'Choose File' }} />
    </div>
  );
}
