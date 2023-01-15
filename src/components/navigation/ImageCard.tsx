import { useState } from 'react';
import RemoveImageWrapper from '../RemoveImageWrapper';

export default function ImageCard({ file }: { file: File }) {
  const [showRemove, setShowRemove] = useState<boolean>(false);
  return (
    <RemoveImageWrapper {...{ showRemove, setShowRemove }}>
      <div className="image-card">
        <img
          onMouseEnter={() => setShowRemove(true)}
          src={URL.createObjectURL(file)}
        />
      </div>
    </RemoveImageWrapper>
  );
}
