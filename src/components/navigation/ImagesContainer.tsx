import FileInput from '../FileInput';
import ImageCard from './ImageCard';
import { v4 as uuidv4 } from 'uuid';

export default function ImagesContainer({
  files,
  handleImageUpload,
  handleRemoveFile,
}: {
  files: File[];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
}) {
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
