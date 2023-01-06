import { FormEvent, useEffect, useState } from 'react';
import useUserContext from '../../hooks/useUserContext';
import TextField from '../TextField';
import useEditInfo from '../../hooks/useEditInfo';
import { Link, Navigate } from 'react-router-dom';
import Button from '../buttons/Button';
import useDeleteProfilePicture from '../../hooks/useDeleteProfilePicture';
import default_insta from '../../assets/default_insta.jpg';

export const EditInfo = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const userContext = useUserContext();
  const { editInfo, error, isLoading, message } = useEditInfo();
  const { deleteProfilePicture, deleteMessage, errorMessage } =
    useDeleteProfilePicture();

  console.log(userContext?.user.imageId);
  useEffect(() => {
    setUsername(userContext?.user.username!);
    setFirstName(userContext?.user.firstName!);
    setLastName(userContext?.user.lastName!);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await editInfo(username, firstName, lastName);
  }
  if (isLoading) <h1>Loading....</h1>;

  return (
    <div className="edit-container">
      <h3>{error}</h3>
      <h3>{errorMessage}</h3>
      <Link to={`/profile/${userContext?.user._id}`}>
        <Button className="primary-btn">Back to profile</Button>
      </Link>
      <div className="profile-image">
        <img
          src={userContext?.user.imageUrl || default_insta}
          width="48px"
          height="48px"
        />
        <button>Change photo</button>
        <br></br>
        {userContext?.user.imageUrl && (
          <button
            onClick={() => deleteProfilePicture(userContext?.user?.imageId!)}
          >
            Delete Photo
          </button>
        )}
      </div>
      <form className="edit-form" onSubmit={handleSubmit}>
        Username
        <TextField
          className="username"
          value={username}
          onChange={(username) => setUsername(username)}
        />
        First Name
        <TextField
          className="fistName"
          value={firstName}
          onChange={(firstName) => setFirstName(firstName)}
        />
        Last Name
        <TextField
          className="lastName"
          value={lastName}
          onChange={(lastName) => setLastName(lastName)}
        />
        <Button className="primary-btn">Edit</Button>
      </form>
      {message ||
        (deleteMessage && (
          <Navigate to={`/profile/${userContext?.user._id}`} />
        ))}
    </div>
  );
};
