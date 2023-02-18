import { useState } from 'react';
import RemoveImageWrapper from '../RemoveImageWrapper';
import { ImageCardProps } from './types';

export default function ImageCard({ file, removeFile }: ImageCardProps) {
  const [showRemove, setShowRemove] = useState<boolean>(false);
  return (
    <RemoveImageWrapper {...{ showRemove, setShowRemove, removeFile }}>
      <img
        onMouseEnter={() => setShowRemove(true)}
        src={URL.createObjectURL(file)}
      />
    </RemoveImageWrapper>
  );
}
