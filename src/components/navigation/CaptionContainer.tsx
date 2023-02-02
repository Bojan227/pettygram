import { useState } from 'react';
import { ShareButton } from '../buttons/ShareButton';
import useUserContext from '../../hooks/useUserContext';
import useCreatePost from '../../hooks/useCreatePost';
import { Navigate } from 'react-router-dom';

export default function CaptionContainer({ files }: { files: File[] }) {
  const [caption, setCaption] = useState('');
  const userContext = useUserContext();
  const { createPost, isLoading, message, error } = useCreatePost();

  const handleSubmit = async () => {
    if (files) {
      await createPost(caption, files);
      setCaption('');
    }
  };

  return (
    <div className="caption-container">
      <div className="user-info">
        <img
          src={userContext?.user.imageUrl}
          alt={userContext?.user.username}
        />
        <h4>{userContext?.user.username}</h4>
        <ShareButton
          disabled={caption ? false : true}
          onClick={handleSubmit}
          className="share-btn"
        >
          {isLoading ? 'Loading...' : 'Share'}
        </ShareButton>
      </div>
      <textarea
        value={caption}
        onChange={(e) => setCaption(() => e.target.value)}
        placeholder="Write a caption..."
      />
      {message && <Navigate to="/" />}
      {error && <h2>{error}</h2>}
    </div>
  );
}
