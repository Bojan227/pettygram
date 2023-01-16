import React from 'react';

export default function RemoveImageWrapper({
  children,
  showRemove,
  setShowRemove,
  removeFile,
}: {
  children: React.ReactNode;
  showRemove: boolean;
  setShowRemove: React.Dispatch<React.SetStateAction<boolean>>;
  removeFile: () => void;
}) {
  return (
    <div
      onMouseLeave={() => setShowRemove(false)}
      onClick={removeFile}
      className={showRemove ? 'remove-image' : ''}
    >
      {children}
    </div>
  );
}
