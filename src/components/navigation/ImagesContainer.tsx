import FileInput from '../FileInput';
import ImageCard from './ImageCard';
import { v4 as uuidv4 } from 'uuid';
import { ImagesContainerProps } from './types';

export default function ImagesContainer({
  files,
  handleImageUpload,
  handleRemoveFile,
}: ImagesContainerProps) {
  return (
    <div className="images-container">
      {files.map((file, i) => (
        <ImageCard
          key={uuidv4()}
          {...{ file }}
          removeFile={() => handleRemoveFile(i)}
        />
      ))}
      <FileInput {...{ handleImageUpload, title: 'Add' }} />
    </div>
  );
}
