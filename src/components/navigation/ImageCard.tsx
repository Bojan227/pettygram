import { useState } from 'react';
import RemoveImageWrapper from '../RemoveImageWrapper';

export default function ImageCard({
  file,
  removeFile,
}: {
  file: File;
  removeFile: () => void;
}) {
  const [showRemove, setShowRemove] = useState<boolean>(false);
  return (
    <RemoveImageWrapper {...{ showRemove, setShowRemove, removeFile }}>
      <div className="image-card">
        <img
          onMouseEnter={() => setShowRemove(true)}
          src={URL.createObjectURL(file)}
        />
      </div>
    </RemoveImageWrapper>
  );
}
