import { useState } from 'react';
import useUserContext from '../../hooks/useUserContext';
import default_insta from '../../assets/default_insta.jpg';
import useDeleteProfilePicture from '../../hooks/useDeleteProfilePicture';
import useUpdateProfilePicture from '../../hooks/useUpdateProfilePicture';

export default function UploadProfilePicture() {
  const userContext = useUserContext();
  const [image, setImage] = useState<File | undefined>();
  const {
    deleteProfilePicture,
    deleteMessage,
    errorMessage,
    isLoadingDeleteState,
  } = useDeleteProfilePicture();
  const { updateProfilePicture, isLoading, message, error } =
    useUpdateProfilePicture();

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
            src={userContext?.user.imageUrl || default_insta}
            width="48px"
            height="48px"
          />
        ))}
      <input
        type="file"
        name="img"
        onChange={(e) => e.target.files && setImage(e.target.files[0])}
      />
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
      <br></br>
      {userContext?.user.imageUrl && (
        <button
          onClick={() => {
            deleteProfilePicture(userContext?.user?.imageId!);
          }}
        >
          Delete Photo
        </button>
      )}
      {errorMessage && <h2>{errorMessage}</h2>}
      {deleteMessage && <h2>{deleteMessage}</h2>}

      {error && <h2>{error}</h2>}
      {message && <h2>{message}</h2>}
    </div>
  );
}
