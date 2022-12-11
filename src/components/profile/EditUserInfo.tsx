import { FormEvent, useEffect, useState } from 'react';
import useUserContext from '../../hooks/useUserContext';
import TextField from '../TextField';
import useEditInfo from '../../hooks/useEditInfo';
import { Link, Navigate } from 'react-router-dom';
import Button from '../buttons/Button';

export const EditInfo = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const userContext = useUserContext();
  const { editInfo, error, isLoading, message } = useEditInfo();

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
      <Link to={`/profile/${userContext?.user._id}`}>
        <Button className="primary-btn">Back to profile</Button>
      </Link>
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
      {message && <Navigate to={`/profile/${userContext?.user._id}`} />}
    </div>
  );
};
