import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function ImageOverlay({
  likes,
  children,
}: {
  likes: string[];
  children: React.ReactNode;
}) {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div
      className="profile-post-image"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <div className={`image-overlay ${showOverlay ? 'show-overlay' : ''}`}>
        <HeartIcon fill="white" width="42px" />
        <h1>{likes.length}</h1>
      </div>
      {children}
    </div>
  );
}
