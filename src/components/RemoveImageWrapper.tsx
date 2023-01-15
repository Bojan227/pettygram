import React from 'react';

export default function RemoveImageWrapper({
  children,
  showRemove,
  setShowRemove,
}: {
  children: React.ReactNode;
  showRemove: boolean;
  setShowRemove: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      onMouseLeave={() => setShowRemove(false)}
      className={showRemove ? 'remove-image' : ''}
    >
      {children}
      <div className="remove-icon">X</div>
    </div>
  );
}
