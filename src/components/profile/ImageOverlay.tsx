import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function ImageOverlay({
  showOverlay,
  likes,
  setShowOverlay,
}: {
  showOverlay: boolean;
  likes: string[];
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      onMouseLeave={() => setShowOverlay(false)}
      className={`image-overlay ${showOverlay ? 'show-overlay' : ''}`}
    >
      <HeartIcon fill="white" width="42px" />
      <h3>{likes.length}</h3>
    </div>
  );
}
