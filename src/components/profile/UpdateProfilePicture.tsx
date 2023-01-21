import { useState } from 'react';
import useUserContext from '../../hooks/useUserContext';
import default_insta from '../../assets/default_insta.jpg';
import useDeleteProfilePicture from '../../hooks/useDeleteProfilePicture';
import useUpdateProfilePicture from '../../hooks/useUpdateProfilePicture';
import ChangePictureModal from './ChangePictureModal';

export default function UploadProfilePicture() {
  const userContext = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const {
    deleteProfilePicture,
    deleteMessage,
    errorMessage,
    isLoadingDeleteState,
  } = useDeleteProfilePicture();

  const { updateProfilePicture, isLoading, message, error } =
    useUpdateProfilePicture();

  const [image, setImage] = useState<File | undefined>(undefined);

  const handleImageUpload = () => {
    const reader: any = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      updateProfilePicture(reader.result);
    };
  };

  return (
    <div className="profile-image">
      {isLoading ||
        (isLoadingDeleteState ? (
          <h1>Loading....</h1>
        ) : (
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : userContext?.user?.imageUrl || default_insta
            }
          />
        ))}
      <div>
        <h4>{userContext?.user.username}</h4>
        <h4 onClick={() => setShowModal(true)}>Change profile photo</h4>
        {image && (
          <button
            onClick={() => {
              if (userContext?.user.imageId) {
                deleteProfilePicture(userContext?.user.imageId);
              }
              handleImageUpload();
              setImage(undefined);
            }}
          >
            Update your profile picture
          </button>
        )}
      </div>
      <ChangePictureModal {...{ showModal, setShowModal, setImage, image }} />
    </div>
  );
}
