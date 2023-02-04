import { useState } from 'react';
import FileInput from '../FileInput';
import useDeleteProfilePicture from '../../hooks/useDeleteProfilePicture';
import useUserContext from '../../hooks/useUserContext';

export default function ChangePictureModal({
  showModal,
  setShowModal,
  setImage,
  image,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  image: File | undefined;
}) {
  const {
    deleteProfilePicture,
    deleteMessage,
    errorMessage,
    isLoadingDeleteState,
  } = useDeleteProfilePicture();
  const userContext = useUserContext();

  return (
    <div
      className={`change-photo ${showModal ? 'active' : ''}`}
      onClick={() => setShowModal(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {image ? (
          <h3 onClick={() => setImage(undefined)}>Remove Image</h3>
        ) : (
          <input
            type="file"
            name="img"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
          />
        )}

        <h4
          onClick={() => {
            userContext?.user.imageId &&
              deleteProfilePicture(userContext?.user?.imageId);
            setShowModal(false);
          }}
        >
          Remove Current Photo
        </h4>
        <p onClick={() => setShowModal(false)}>Cancel</p>
      </div>
    </div>
  );
}
