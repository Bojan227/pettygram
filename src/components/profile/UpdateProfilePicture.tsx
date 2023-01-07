import { useState } from 'react';
import useUserContext from '../../hooks/useUserContext';
import default_insta from '../../assets/default_insta.jpg';
import useDeleteProfilePicture from '../../hooks/useDeleteProfilePicture';

export default function UploadProfilePicture() {
  const userContext = useUserContext();
  const [image, setImage] = useState<File>();
  const { deleteProfilePicture, deleteMessage, errorMessage } =
    useDeleteProfilePicture();

  return (
    <div className="profile-image">
      <img
        src={userContext?.user.imageUrl || default_insta}
        width="48px"
        height="48px"
      />
      <input
        type="file"
        name="img"
        onChange={(e) => e.target.files && setImage(e.target.files[0])}
      />
      {image && <button>Update your profile picture</button>}
      <br></br>
      {userContext?.user.imageUrl && (
        <button
          onClick={() => deleteProfilePicture(userContext?.user?.imageId!)}
        >
          Delete Photo
        </button>
      )}
    </div>
  );
}
